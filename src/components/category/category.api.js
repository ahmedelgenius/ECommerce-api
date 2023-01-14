const router = require("express").Router();
const { uploadSingleFile } = require("../../utils/fileUpload");
const SubcategoryRouter = require("../subcategory/subcategory.api");
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("./category.service");

router.use("/:categoryId/subcategories", SubcategoryRouter);
router
  .route("/")
  .post(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    createCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    updateCategory
  )
  .delete(ProtectedRoutes, allowedTo("admin"), deleteCategory);
module.exports = router;
