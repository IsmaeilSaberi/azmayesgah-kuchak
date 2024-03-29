const mongoose = require("mongoose");
const ExperimentSchema = new mongoose.Schema({
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
  image: {
    required: true,
    type: String,
  },
  imageAlt: {
    required: true,
    type: String,
  },
  videoLink: {
    required: true,
    type: String,
  },
  videoDuration: {
    type: Number,
    required: true,
  },
  videoSize: {
    type: Number,
    required: true,
  },
  audioLink: {
    required: true,
    type: String,
  },
  audioDuration: {
    type: Number,
    required: true,
  },
  audioSize: {
    type: Number,
    required: true,
  },
  shortDesc: {
    required: true,
    type: String,
  },
  longDesc: {
    required: true,
    type: String,
  },
  tags: {
    required: true,
    type: Array,
    default: [],
  },
  relatedExperiments: {
    required: true,
    type: Array,
    default: [],
  },
  relatedProducts: {
    required: true,
    type: Array,
    default: [],
  },
  typeOfModel: {
    required: true,
    type: String,
    default: "experiment",
  },
  pageView: {
    required: true,
    type: Number,
    default: 0,
  },
  published: {
    required: true,
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Experiment", ExperimentSchema);
