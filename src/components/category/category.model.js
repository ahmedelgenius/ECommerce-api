const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "category name must be required"],
      minlength: [2, "too short  name must be at least 2 characters"],
      trim: true,
      unique: [true, "category name must be unique"],
    },
    image: String,
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.image = "http://localhost:3000/category/" + doc.image;
});
module.exports = model("category", schema);
