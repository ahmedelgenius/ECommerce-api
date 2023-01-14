const slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr.js");
const AppError = require("../../utils/AppError.js");
// const cloudinary = require("cloudinary");
// cloudinary.config({
//   cloud_name: "dkdyp41kl",
//   api_key: "178161683367699",
//   api_secret: "uXqScGOa7pUQySLjnsIxusp9ZjU",
// });

//create document
exports.createDocument = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    // cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
    // console.log(result);

    if (req.body.email) {
      let isUser = await Model.findOne({ email: req.body.email });
      if (isUser) {
        return next(new AppError("email already exists", 401));
      }
    }
    let imgs = [];
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    // req.body.image = result.secure_url;

    req.body.image = req.file?.filename;
    // console.log(req.body.image);

    if (req.files) {
      req.body.imageCover = req.files.imageCover[0].filename;
      req.files.images.forEach((elm) => {
        imgs.push(elm.filename);
      });
    }
    req.body.images = imgs;
    let document = new Model(req.body);
    await document.save();
    res.status(200).json({ message: "create document is done", document });
    // });
  });
};
exports.deleteOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new AppError("document not found", 404));
    }
    res.status(200).json({ message: " deleted ", results: document });
  });
};

exports.updateDocument = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    // cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
    let { id } = req.params;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    req.body.image = req.file?.filename;
    let document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !document && next(new AppError("document not found", 404));
    document && res.status(200).json({ message: "document updated", document });
    // });
  });
};

exports.getDocument = (Model) => {
  return catchAsyncError(async (req, res) => {
    let { id } = req.params;

    let document = await Model.findById(id);

    !document && next(new AppError("document not found", 404));
    document && res.status(200).json({ message: "document", document });
  });
};

exports.getDocuments = (Model) => {
  return catchAsyncError(async (req, res) => {
    // pagnation
    let page = req.query.page * 1 || 1;
    if (req.query.page < 0) {
      page = 1;
    }
    let limit = 5;
    let skip = (page - 1) * limit;
    // filter
    let queryString = { ...req.query };
    let excludedQuery = ["page", "sort", "keyword", "fields"];
    excludedQuery.forEach((elem) => {
      delete queryString[elem];
    });
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);

    let mongoosQuery = Model.find(queryString).skip(skip).limit(skip);
    if (req.query.sort) {
      let sortedBy = req.query.sort.replace(",", " ");

      mongoosQuery.sort(sortedBy);
    }
    if (req.query.keyword) {
      let keyword = req.query.keyword;
      mongoosQuery.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      });
    }

    if (req.query.fields) {
      let fields = req.query.fields.replace(",", " ");
      mongoosQuery.select(fields);
    }
    let documents = await mongoosQuery;
    res.status(200).json({ message: "All documents", page, documents });
  });
};
