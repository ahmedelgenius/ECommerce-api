const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");
const userModel = require("../user/user.model.js");

exports.addToWishlist = catchAsyncError(async (req, res, next) => {
  let { wishlist } = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.product },
    },
    {
      new: true,
    }
  );
  !wishlist && next(new AppError("wishlist not found", 404));
  wishlist && res.status(200).json({ message: "wishlist added", wishlist });
});

exports.removeFromWishlist = catchAsyncError(async (req, res, next) => {
  let { wishlist } = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.body.product },
    },
    {
      new: true,
    }
  );
  !wishlist && next(new AppError("wishlist not found", 404));
  wishlist && res.status(200).json({ message: "wishlist deleted", wishlist });
});

exports.getAllWishlists = catchAsyncError(async (req, res, next) => {
  let { wishlist } = await userModel.findById(req.user._id);
  wishlist && next(new AppError("wishlist not found", 404));
  wishlist && res.status(200).json({ message: "wishlists", wishlist });
});
