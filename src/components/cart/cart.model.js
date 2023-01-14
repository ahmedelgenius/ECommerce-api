const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    cartitems: [
      {
        product: {
          type: Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { type: Number },
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  { timestamps: true }
);

module.exports = model("cart", schema);
