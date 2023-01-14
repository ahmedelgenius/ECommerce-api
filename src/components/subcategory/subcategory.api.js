process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("./subcategory.service");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .post(ProtectedRoutes, allowedTo("admin"), createSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategory)
  .put(ProtectedRoutes, allowedTo("admin"), updateSubCategory)
  .delete(ProtectedRoutes, allowedTo("admin"), deleteSubCategory);
module.exports = router;
