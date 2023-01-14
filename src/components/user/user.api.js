const { signup, signin, ProtectedRoutes, allowedTo } = require("./user.auth");
const {
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getUsers,
  changePassword,
} = require("./user.service");

const router = require("express").Router();

router
  .route("/")
  .post(ProtectedRoutes, allowedTo("admin"), createUser)
  .get(ProtectedRoutes, allowedTo("admin"), getUsers);
router
  .route("/:id")
  .get(ProtectedRoutes, allowedTo("admin"), getUser)
  .put(ProtectedRoutes, allowedTo("admin"), updateUser)
  .delete(ProtectedRoutes, allowedTo("admin"), deleteUser);
router.patch("/changePassword/:id", changePassword);
router.post("/signup", signup);
router.post("/signin", signin);
module.exports = router;
