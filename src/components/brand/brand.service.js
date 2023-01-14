process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const BrandModel = require("./Brand.model.js");

const factory = require("../Handlers/Hander.factory");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");

// to create a new Brand
exports.createBrand = factory.createDocument(BrandModel);

// to get all Brands
exports.getBrands = factory.getDocuments(BrandModel);

// to get specific Brand
exports.getBrand = factory.getDocument(BrandModel);

// to update a Brand
exports.updateBrand = factory.updateDocument(BrandModel);
exports.deleteBrand = factory.deleteOne(BrandModel);
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
