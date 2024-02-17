const mongoose = require("mongoose");
const RuleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
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
  slug: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  },
  typeOfRule: {
    required: true,
    type: String,
    enum: ["intro", "experiments"],
  },
  situation: {
    required: true,
    type: Boolean,
  },
  link: {
    required: true,
    type: String,
  },
  pageView: {
    required: true,
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Rule", RuleSchema);
