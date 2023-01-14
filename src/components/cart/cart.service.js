const CartModel = require("./cart.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");
const productModel = require("../product/product.model");
const couponModel = require("../coupon/coupon.model");
function calcTotalCartPrice(cart) {
  let totalPrice = 0;
  cart.cartitems.forEach((elem) => {
    totalPrice += elem.price * elem.quantity;
  });
  cart.totalPrice = totalPrice;

  if (cart.totalPriceAfterDiscount) {
    cart.totalPriceAfterDiscount = (
      cart.totalPrice -
      (cart.totalPrice * cart.discount) / 100
    ).toFixed(2);
  }
}
// to add product ot cart
exports.addProductToCart = catchAsyncError(async (req, res, next) => {
  const { price } = await productModel
    .findById(req.body.product)
    .select("price");
  req.body.price = price;
  const cart = await CartModel.findOne({ user: req.user._id });

  if (!cart) {
    let newCart = new CartModel({
      cartitems: [req.body],
      user: req.user._id,
    });
    calcTotalCartPrice(newCart);
    await newCart.save();
    res.status(200).json({ message: "added product to cart", newCart });
  } else {
    let findProduct = cart.cartitems.find(
      (elm) => elm.product == req.body.product
    );
    if (findProduct) {
      findProduct.quantity += 1;
    } else {
      cart.cartitems.push(req.body);
    }
    calcTotalCartPrice(cart);
    await cart.save();
    res.status(200).json(cart);
  }
});

exports.removeProductFromCart = catchAsyncError(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });
  let cartitems = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartitems: { _id: req.body.itemId } },
    },
    {
      new: true,
    }
  );
  calcTotalCartPrice(cart);
  await cart.save();
  !cartitems && next(new AppError("product not found", 404));
  cartitems && res.status(200).json({ message: "product deleted", cartitems });
});

exports.updateQuantity = catchAsyncError(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });

  let findProduct = cart.cartitems.find(
    (elm) => elm.product == req.body.product
  );

  if (!findProduct) return next(new AppError("product not found", 404));
  if (findProduct) {
    findProduct.quantity = req.body.quantity;
  }
  calcTotalCartPrice(cart);

  await cart.save();
  res.status(200).json(cart);
});
exports.applyCoupon = catchAsyncError(async (req, res, next) => {
  const { code, discount } = await couponModel.findOne({
    code: req.body.code,
    expires: {
      $gt: Date.now(),
    },
  });
  if (!code) return next(new AppError("code not found or expired"));
  const cart = await CartModel.findOne({ user: req.user._id });
  cart.totalPriceAfterDiscount = (
    cart.totalPrice -
    (cart.totalPrice * discount) / 100
  ).toFixed(2);
  cart.discount = discount;
  await cart.save();
  res.status(200).json(cart);
});

exports.getUserCart = catchAsyncError(async (req, res, next) => {
  const Cart = await CartModel.findOne({ user: req.user._id });

  res.status(200).json({ resaluts: Cart.cartitems.length, cart: Cart });
});
