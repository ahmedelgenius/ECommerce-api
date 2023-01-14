const UserModel = require("./user.model.js");
const factory = require("../Handlers/Hander.factory");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = factory.createDocument(UserModel);

exports.signin = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new AppError("incorrect email or password ", 401));

  let token = jwt.sign(
    { name: user.name, userId: user._id },
    process.env.JWT_kEY
  );

  res.status(200).json({ token });
});

exports.ProtectedRoutes = catchAsyncError(async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return next(new AppError("token not provided ", 401));

  let decoded = jwt.verify(token, process.env.JWT_kEY);
  let user = await UserModel.findById(decoded.userId);
  if (!user) return next(new AppError("User Not Found  ", 404));

  req.user = user;

  return next();
});

exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You Are not authorized to access this route", 401)
      );
    }

    return next();
  });
};
