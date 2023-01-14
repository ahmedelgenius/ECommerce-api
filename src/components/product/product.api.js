const { uploadMixOfFile } = require("../../utils/fileUpload");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./product.service");
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo("admin"));
const fields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
];
router
  .route("/")
  .post(uploadMixOfFile(fields, "product"), createProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(uploadMixOfFile(fields, "product"), updateProduct)
  .delete(deleteProduct);
module.exports = router;
