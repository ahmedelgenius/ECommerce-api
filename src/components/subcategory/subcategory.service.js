process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const SubCategoryModel = require("./subcategory.model.js");
const slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");

// to create a new subcategory
exports.createSubCategory = catchAsyncError(async (req, res) => {
  let { name, category } = req.body;

  let subcategory = new SubCategoryModel({
    name,
    slug: slugify(name),
    category,
  });
  await subcategory.save();
  res.status(200).json({ message: "create subcategory is done", subcategory });
});
// to get all subcategories
exports.getSubCategories = catchAsyncError(async (req, res) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }

  let subcategories = await SubCategoryModel.find(filter).populate(
    "category",
    "name -_id"
  );
  res.status(200).json({ message: "All Categories", subcategories });
});
// to get specific subcategory
exports.getSubCategory = catchAsyncError(async (req, res) => {
  let { id } = req.params;

  let subcategory = await SubCategoryModel.findById(id);

  res.status(200).json({ message: "specific subcategory", subcategory });
});

// to update a subcategory
exports.updateSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let subcategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true }
  );
  if (!subcategory) {
    return next(new AppError("SubCategory not found", 404));
  }
  res.status(200).json({ message: "SubCategory updated", subcategory });
});
exports.deleteSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let subcategory = await SubCategoryModel.findByIdAndDelete(id);
  if (!subcategory) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new AppError("SubCategory not found", 404));
  } else {
    res.status(200).json({ message: "SubCategory deleted" });
  }
});
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
