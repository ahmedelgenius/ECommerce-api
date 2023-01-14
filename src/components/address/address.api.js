const router = require("express").Router();
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  addToAddresses,
  getAllAddresses,
  removeFromAddresses,
} = require("./address.service");

router.use(ProtectedRoutes, allowedTo("user"));
router
  .route("/")
  .patch(addToAddresses)
  .get(getAllAddresses)
  .delete(removeFromAddresses);
module.exports = router;
