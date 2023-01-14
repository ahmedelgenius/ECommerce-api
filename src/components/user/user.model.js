const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");
const slugify = require("slugify");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "user name must be required"],
      minlength: [2, "too short user name must be at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, " email must be required"],
      trim: true,
      unique: [true, " email must be unique"],
    },
    phone: {
      type: String,
      required: [true, " phone must be required"],
    },
    password: {
      type: String,
      required: [true, " password must be required"],
      minlength: [6, " password must be at last 6 characters"],
    },

    profileImg: String,

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishlist: [{ type: Types.ObjectId, ref: "product" }],
    addresses: [{ name: String, street: String, city: String, phone: Number }],
  },
  { timestamps: true }
);
schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
});

schema.pre("findOneAndUpdate", async function () {
  if (!this._update.password) return;
  this._update.password = await bcrypt.hash(
    this._update.password,
    Number(process.env.ROUND)
  );
  // console.log(this);
});

module.exports = model("user", schema);
