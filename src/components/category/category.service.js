process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const CategoryModel = require("./category.model.js");
const factory = require("../Handlers/Hander.factory");
const slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");

// to create a new category
exports.createCategory = factory.createDocument(CategoryModel);
// to get all categories
exports.getCategories = factory.getDocuments(CategoryModel);

// to get specific category
exports.getCategory = factory.getDocument(CategoryModel);

// to update a category
exports.updateCategory = factory.updateDocument(CategoryModel);

// to delete category
exports.deleteCategory = factory.deleteOne(CategoryModel);

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
