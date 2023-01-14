const router = require("express").Router();
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { createOrder } = require("./order.service");

router.use(ProtectedRoutes, allowedTo("user"));
router.route("/").post(createOrder);

module.exports = router;
