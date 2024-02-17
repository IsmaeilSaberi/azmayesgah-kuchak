const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["User", "TopAdmin", "Admin"],
    default: "User",
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  comments: {
    required: true,
    type: Array,
    default: [],
  },
  age: {
    required: true,
    type: Number,
  },
  heightHistory: [
    {
      height: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        default: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    },
  ],
  weightHistory: [
    {
      weight: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        default: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    },
  ],
  bmrHistory: [
    {
      bmr: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        default: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    },
  ],
  bmiHistory: [
    {
      date: {
        type: String,
        default: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      bmi: {
        type: Number,
        required: true,
      },
    },
  ],
  viewed: {
    required: true,
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  updatedAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("User", UserSchema);
