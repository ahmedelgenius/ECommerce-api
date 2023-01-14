const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "brand name must be required"],
      minlength: [2, "too short brand  name must be at least 2 characters"],
      trim: true,
      unique: [true, "brand name must be unique"],
    },
    slug: {
      type: "string",
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.image = "http://localhost:3000/brand/" + doc.image;
});
module.exports = model("brand", schema);
