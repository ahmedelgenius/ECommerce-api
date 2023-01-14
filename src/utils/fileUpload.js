const multer = require("multer");
const AppError = require("./AppError");
const options = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only ", 400), false);
    }
  }
  const upload = multer({ storage, fileFilter });

  return upload;
};

exports.uploadSingleFile = (fieldName, folderName) => {
  return options(folderName).single(fieldName);
};
exports.uploadMixOfFile = (fieldsArray, folderName) => {
  return options(folderName).fields(fieldsArray);
};
