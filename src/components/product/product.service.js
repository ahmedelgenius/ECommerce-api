process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const ProductModel = require("./product.model");
const factory = require("../Handlers/Hander.factory");
const slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");

// to create a new Product
exports.createProduct = factory.createDocument(ProductModel);
// to get all Products
exports.getProducts = factory.getDocuments(ProductModel);
// to get specific Product
exports.getProduct = factory.getDocument(ProductModel);

// to update a Product
exports.updateProduct = factory.updateDocument(ProductModel);
// to delete a Product
exports.deleteProduct = factory.deleteOne(ProductModel);

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
