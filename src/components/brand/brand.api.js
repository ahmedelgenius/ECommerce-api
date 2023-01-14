const { uploadSingleFile } = require("../../utils/fileUpload");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("./brand.service");

const router = require("express").Router();
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");

router.use(ProtectedRoutes, allowedTo("admin"));
router
  .route("/")
  .post(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brand"),
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getBrand)
  .put(
    ProtectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brand"),
    updateBrand
  )
  .delete(ProtectedRoutes, allowedTo("admin"), deleteBrand);
module.exports = router;
