const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const couponModel = require("../coupon/coupon.model");
const productModel = require("../product/product.model");
const orderModel = require("./order.model");

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { couponId, products } = req.body;
  const finalList = [];
  let sumTotal = 0;
  for (let i = 0; i < products.length; i++) {
    const checkItem = await productModel.findOne({
      _id: products[i].product,
      stock: { $gte: products[i].quantity },
    });
    // console.log({ productId: products[i].product });
    if (!checkItem) {
      return next(new AppError("In-valid to place this order", 409));
    }
    products[i].unitPrice = checkItem.price;
    products[i].totalPrice = checkItem.price * products[i].quantity;
    sumTotal += products[i].totalPrice;
    finalList.push(products[i]);
  }
  req.body.totalPrice = sumTotal;
  // console.log({ sumTotal: sumTotal, finalList: finalList });
  if (couponId) {
    const checkCoupon = await couponModel.findOne({
      _id: couponId,
      usedBy: { $nin: req.user._id },
    });
    console.log({ coupon: checkCoupon });
    if (!checkCoupon) {
      return next(new AppError("In-valid coupon", 409));
    }
    req.body.totalPrice = sumTotal - sumTotal * (checkCoupon.discount / 100);
  }
  req.body.userId = req.user._id;
  req.body.products = finalList;
  const order = new orderModel(req.body);
  await order.save();
  if (order) {
    // if (couponId) {
    //   await couponModel.findByIdAndUpdate({
    //     couponId,
    //     $addToSet: { usedBy: req.user._id },
    //   });
    // }
    return res.status(201).json({ message: "order is done", order });
  } else {
    return next(new AppError("Fail to place your order", 400));
  }
});
