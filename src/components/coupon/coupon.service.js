process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const CouponModel = require("./coupon.model");
const factory = require("../Handlers/Hander.factory");

exports.createCoupon = factory.createDocument(CouponModel);
// to get all Coupons
exports.getCoupons = factory.getDocuments(CouponModel);

// to get specific Coupon
exports.getCoupon = factory.getDocument(CouponModel);

// to update a Coupon
exports.updateCoupon = factory.updateDocument(CouponModel);
//
// to delete Coupon
exports.deleteCoupon = factory.deleteOne(CouponModel);

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
