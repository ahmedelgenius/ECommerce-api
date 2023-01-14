const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    title: {
      type: String,
      required: [true, "review title must be required"],
      minlength: [2, "too short review title must be at least 2 characters"],
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "user id must be required"],
    },

    product: {
      type: Types.ObjectId,
      ref: "product",
      required: [true, "product id must be required"],
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("user", "name");
});
module.exports = model("review", schema);
