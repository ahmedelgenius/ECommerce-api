const router = require("express").Router();
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("./reviews.service");

router
  .route("/")
  .post(
    ProtectedRoutes,
    allowedTo("user"),

    createReview
  )
  .get(getReviews);
router
  .route("/:id")
  .get(getReview)
  .put(
    ProtectedRoutes,
    allowedTo("user"),

    updateReview
  )
  .delete(ProtectedRoutes, allowedTo("user"), deleteReview);
module.exports = router;
