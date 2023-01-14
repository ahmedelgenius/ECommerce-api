const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "product name must be required"],
      minlength: [2, "too short product name must be at least 2 characters"],
      trim: true,
      unique: [true, "product name must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    colors: {
      type: String,
    },
    description: {
      type: String,
      minlength: [2, "too short product name must be at least 2 characters"],
    },
    price: {
      type: Number,
      required: [true, " product price must be required"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, " product price must be required"],
    },
    imageCover: {
      type: String,
    },
    images: [String],
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "category id must be required"],
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "subcategory",
      required: [true, "subcategory id must be required"],
    },

    brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "brand id must be required"],
    },
    stock: {
      type: Number,
      default: 1,
    },
    averageRating: {
      type: Number,
      min: [1, "rating must be between 1 and 5"],
      max: [5, "rating must be between 1 and 5"],
    },

    ratingCount: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      required: [true, "sold must be required"],
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
    size: {
      type: [String],
      enum: ["s", "m", "l", "xl"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

schema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});

schema.pre("findOne", function () {
  this.populate("reviews", "name");
});

schema.post("init", (doc) => {
  if (doc.imageCover && doc.images) {
    let imgs = [];
    doc.imageCover = "http://localhost:3000/product/" + doc.imageCover;
    doc.images.forEach((elm) => {
      imgs.push("http://localhost:3000/product/" + elm);
    });
    doc.images = imgs;
  }
});

module.exports = model("product", schema);
