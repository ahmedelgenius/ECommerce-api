const router = require("express").Router();
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  addToWishlist,
  getAllWishlists,
  removeFromWishlist,
} = require("./wishlist.service");
router.use(ProtectedRoutes, allowedTo("user"));
router
  .route("/")
  .patch(addToWishlist)
  .get(getAllWishlists)
  .delete(removeFromWishlist);
module.exports = router;
