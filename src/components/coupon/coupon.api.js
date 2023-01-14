const router = require("express").Router();

const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("./coupon.service");

router.use(ProtectedRoutes, allowedTo("admin"));
router.route("/").post(createCoupon).get(getCoupons);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);
module.exports = router;
