const router = require("express").Router();
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  applyCoupon,
  getUserCart,
} = require("./cart.service");
router.use(ProtectedRoutes, allowedTo("user"));
router
  .route("/")
  .post(addProductToCart)
  .delete(removeProductFromCart)
  .put(updateQuantity)
  .get(getUserCart);

router.post("/applyCoupon", applyCoupon);

module.exports = router;
