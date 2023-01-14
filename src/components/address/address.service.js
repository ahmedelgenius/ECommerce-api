const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");
const userModel = require("../user/user.model.js");

exports.addToAddresses = catchAsyncError(async (req, res, next) => {
  let { addresses } = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    {
      new: true,
    }
  );
  !addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json({ message: "address added", addresses });
});

exports.removeFromAddresses = catchAsyncError(async (req, res, next) => {
  let { addresses } = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.body.address } },
    },
    {
      new: true,
    }
  );
  !addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json({ message: "address deleted", addresses });
});

exports.getAllAddresses = catchAsyncError(async (req, res, next) => {
  let { addresses } = await userModel.findById(req.user._id);
  addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json({ message: "addresses", addresses });
});
