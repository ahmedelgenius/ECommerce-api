process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});
const UserModel = require("./user.model.js");

const factory = require("../Handlers/Hander.factory");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");

// to create a new User
exports.createUser = factory.createDocument(UserModel);

// to get all Users
exports.getUsers = factory.getDocuments(UserModel);

// to get specific User
exports.getUser = factory.getDocument(UserModel);

// to update a User
exports.updateUser = factory.updateDocument(UserModel);
exports.deleteUser = factory.deleteOne(UserModel);
exports.changePassword = factory.updateDocument(UserModel);
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
