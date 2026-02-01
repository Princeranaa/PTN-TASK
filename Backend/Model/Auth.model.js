const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        require: true,
      },
      lastname: {
        type: String,
        require: true,
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female"],
      default: "male",
    },
    avatar: {
      type: String,
      default: "", 
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
