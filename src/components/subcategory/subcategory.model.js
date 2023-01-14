const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "subcategory name must be required"],
      minlength: [2, "too short  name must be at least 2 characters"],
      unique: [true, "name must be unique "],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "category id must be required"],
    },
  },
  { timestamps: true }
);
module.exports = model("subcategory", schema);
