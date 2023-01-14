process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const ReviewModel = require("./reviews.model");

const factory = require("../Handlers/Hander.factory");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");

// to create a new Review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const isReview = await ReviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReview) return next(new AppError("you create a review before", 401));

  let Review = new ReviewModel(req.body);
  await Review.save();
  res.status(200).json({ message: "create document is done", Review });
});

// to get all Reviews
exports.getReviews = factory.getDocuments(ReviewModel);

// to get specific Review
exports.getReview = factory.getDocument(ReviewModel);

// to update a Review
exports.updateReview = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let isReview = await ReviewModel.findById(id);
  if (isReview.user?._id.toString() == req.user._id.toString()) {
    let Review = await ReviewModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !Review && next(new AppError("Review not found", 404));
    Review && res.status(200).json({ message: "Review updated", Review });
  } else {
    return next(new AppError("this reviwe not for you", 404));
  }
});

exports.deleteReview = factory.deleteOne(ReviewModel);
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
