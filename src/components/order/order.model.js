const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: "product",
        },
        unitPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
          default: 1,
        },
      },
    ],
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    paymentMethod: {
      type: String,
      default: "Cash",
      enum: ["Cash", "Visa"],
    },
    totalPrice: {
      type: Number,
      default: 1,
    },
    couponId: {
      type: Types.ObjectId,
      ref: "coupon",
    },
    status: {
      type: String,
      default: "placed",
      enum: ["placed", "received", "rejected", "onWay"],
    },
  },
  { timestamps: true }
);

module.exports = model("order", schema);
