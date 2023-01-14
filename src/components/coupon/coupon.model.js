const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code must be a required"],
      trim: true,
      unique: [true, "coupon code must be unique"],
    },
    expires: {
      type: Date,
    },
    discount: {
      type: Number,
    },
    usedBy: [{ type: Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = model("coupon", schema);
