const express = require("express");
const router = express();
const { check } = require("express-validator");
const Experiment = require("../models/Experiment");

const isAdmin = require("../middlewares/isAdmin");

const ExperimentCtrl = require("../controllers/ExperimentCtrl");

router.get("/experiments", isAdmin, ExperimentCtrl.getAllExperiments);

//// THIS RELATED EXPERIMENT ARE FOR ADD OR UPDATE A BLOG
router.get("/related-experiments", ExperimentCtrl.getRelatedExperiments);

router.post(
  "/new-experiment",
  isAdmin,
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check(
      "relatedExperiments",
      "فرمت بخش آزمایشهای مرتبط اشتباه است!"
    ).isArray(),
    check("relatedPosts", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
    check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Experiment.find({
        slug: value,
      }).then((dow) => {
        if (dow.length > 0) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  ExperimentCtrl.newExperiment
);

router.post(
  "/update-experiment/:id",
  isAdmin,
  [
    check("title", "تعداد کاراکتر عنوان باید بیشتر از 8 باشد!").isLength({
      min: 8,
    }),
    check("published", "فرمت بخش انتشار اشتباه است!").isBoolean(),
    check(
      "relatedExperiments",
      "فرمت بخش آزمایشهای مرتبط اشتباه است!"
    ).isArray(),
    check("relatedPosts", "فرمت بخش مقالات مرتبط اشتباه است!").isArray(),
    check("tags", "فرمت بخش برچسب ها اشتباه است!").isArray(),
    check("slug", "لطفا اسلاگ دیگری را انتخاب کنید!").custom((value) => {
      return Experiment.find({
        slug: value,
      }).then((dow) => {
        if (dow.length > 1) {
          throw new Error("لطفا اسلاگ دیگری را انتخاب کنید!");
        }
      });
    }),
  ],
  ExperimentCtrl.updateExperiment
);
router.post("/remove-experiment/:id", isAdmin, ExperimentCtrl.removeExperiment);
router.get("/get-experiment/:slug", ExperimentCtrl.getOneExperiment);
router.get(
  "/get-experiment-by-id/:id",
  isAdmin,
  ExperimentCtrl.getOneExperimentById
);

router.get("/get-new-experiments", ExperimentCtrl.getNewExperiments);

//////\\\\\\ I DIDN'T USED THIS ONE MAY BE IN THE FUTURE
// router.get("/get-most-popular-experimentss", ExperimentsCtrl.getMostPopularExperimentss);

// //// THIS RELATED EXPERIMENTS ARE FOR SINGLE EXPERIMENT AND SINGLE PRODUCT PAGE
router.post(
  "/get-related-experiments-by-ids",
  ExperimentCtrl.getRelatedExperimentsByIds
);
router.get("/search-experiments", ExperimentCtrl.searchExperiments);

module.exports = router;
