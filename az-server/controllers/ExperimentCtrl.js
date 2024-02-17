const Experiment = require("../models/Experiment");
const { validationResult } = require("express-validator");

const getAllExperiments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalExperiments = await Experiment.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAt: 1,
          image: 1,
          imageAlt: 1,
          published: 1,
          pageView: 1,
        });
      const AllExperimentsNumber = await (await Experiment.find()).length;
      res.status(200).json({ GoalExperiments, AllExperimentsNumber });
    } else {
      const AllExperiments = await Experiment.find().sort({ _id: -1 });
      res.status(200).json(AllExperiments);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllExperiments = getAllExperiments;

// THIS RELATED ExperimentS ARE FOR ADD OR UPDATE A Experiment or product
const getRelatedExperiments = async (req, res) => {
  try {
    const AllExperiments = await Experiment.find({ published: true }).select({
      title: 1,
    });
    res.status(200).json(AllExperiments);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedExperiments = getRelatedExperiments;

const newExperiment = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        await Experiment.create(data);
        res.status(200).json({ msg: "دانلود با موفقیت اضافه شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newExperiment = newExperiment;

const updateExperiment = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        await Experiment.findByIdAndUpdate(req.params.id, data, {
          new: true,
        });
        res.status(200).json({ msg: "دانلود با موفقیت آپدیت شد!" });
      } else {
        res.status(422).json({ msg: "فرمت عکس درست نیست!" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateExperiment = updateExperiment;

const removeExperiment = async (req, res) => {
  try {
    await Experiment.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "دانلود با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeExperiment = removeExperiment;

const getOneExperiment = async (req, res) => {
  try {
    const targetExperiment = await Experiment.findOne({
      slug: req.params.slug,
    });
    if (targetExperiment.published == true) {
      // ADD ONE TO PAGE VIEW
      const newExperiment = {
        pageView: targetExperiment.pageView + 1,
      };
      await Experiment.findByIdAndUpdate(targetExperiment._id, newExperiment, {
        new: true,
      });
      res.status(200).json(targetExperiment);
    } else {
      res.status(400).json({ msg: "دانلود هنوز منتشر نشده است!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneExperiment = getOneExperiment;

const getOneExperimentById = async (req, res) => {
  try {
    const targetExperiment = await Experiment.findById(req.params.id);
    res.status(200).json(targetExperiment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneExperimentById = getOneExperimentById;

const getNewExperiments = async (req, res) => {
  try {
    const NewExperiments = await Experiment.find({ published: true })
      .sort({ _id: -1 })
      .limit(10)
      .select({
        title: 1,
        updatedAt: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
      });
    res.status(200).json(NewExperiments);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getNewExperiments = getNewExperiments;

//////\\\\\\ I DIDN'T USED THIS ONE MAY BE IN THE FUTURE
// const getMostPopularExperiments = async (req, res) => {
//   try {
//     const GoalExperiments = await Experiment.find({ published: true })
//       .sort({ pageView: -1 })
//       .limit(3)
//       .select({
//         title: 1,
//         slug: 1,
//       });
//     res.status(200).json(GoalExperiments);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// };
// module.exports.getMostPopularExperiments = getMostPopularExperiments;

// //// THIS RELATED ExperimentS ARE FOR SINGLE Experiment PAGE
const getRelatedExperimentsByIds = async (req, res) => {
  try {
    const goalIds = req.body.goalIds;
    const GoalExperiments = await Experiment.find({ _id: goalIds })
      .sort({ _id: -1 })
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        published: 1,
      });
    const SendingExperiments = GoalExperiments.filter(
      (dow) => dow.published == true
    );
    res.status(200).json(SendingExperiments);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getRelatedExperimentsByIds = getRelatedExperimentsByIds;

const searchExperiments = async (req, res) => {
  try {
    let allExperiments = await Experiment.find({ published: 1 })
      .sort({ _id: -1 })
      .select({
        title: 1,
        slug: 1,
        updatedAt: 1,
        image: 1,
        imageAlt: 1,
        published: 1,
        pageView: 1,
        shortDesc: 1,
        tags: 1,
      });

    ////KEYWORD SEARCH
    if (req.query.keyword) {
      const theKeyword = req.query.keyword;
      const goalExperiment = allExperiments.filter(
        (dow) =>
          dow.title.replace(/\s+/g, "_").toLowerCase().includes(theKeyword) ||
          dow.imageAlt
            .replace(/\s+/g, "_")
            .toLowerCase()
            .includes(theKeyword) ||
          dow.shortDesc.replace(/\s+/g, "_").toLowerCase().includes(theKeyword)
      );
      const relatedExperimentTag = [];
      for (let i = 0; i < allExperiments.length; i++) {
        for (let j = 0; j < allExperiments[i].tags.length; j++) {
          if (allExperiments[i].tags[j].includes(theKeyword)) {
            relatedExperimentTag.push(allExperiments[i]);
          }
        }
      }
      const ExperimentsSummer = [...goalExperiment, ...relatedExperimentTag];
      let unique = (item) => [...new Set(item)];
      allExperiments = unique(ExperimentsSummer);
    }

    ////PAGINATION AND btns
    const ExperimentsNumber = allExperiments.length;
    const paginate = req.query.pgn ? req.query.pgn : 10;
    const pageNumber = req.query.pn ? req.query.pn : 1;
    const startNumber = (pageNumber - 1) * paginate;
    const endNumber = paginate * pageNumber;
    const goalDow = [];
    if (paginate >= 0 && pageNumber >= 0) {
      for (let i = startNumber; i < endNumber; i++) {
        if (allExperiments[i] != null) {
          goalDow.push(allExperiments[i]);
        }
      }
    }
    allExperiments = goalDow;

    const number = Math.ceil(ExperimentsNumber / paginate);
    const allBtns = [...Array(Math.ceil(number)).keys()];
    const btns = [];
    for (let i = 0; i < allBtns.length; i++) {
      if (
        i == 0 ||
        i == allBtns.length - 1 ||
        (i > Number(pageNumber) - 3 && i < Number(pageNumber) + 1)
      ) {
        btns.push(i);
      }
    }

    const outputData = [];
    for (let i = 0; i < allExperiments.length; i++) {
      const obj = {
        _id: allExperiments[i]._id,
        title: allExperiments[i].title,
        slug: allExperiments[i].slug,
        image: allExperiments[i].image,
        imageAlt: allExperiments[i].imageAlt,
        updatedAt: allExperiments[i].updatedAt,
        pageView: allExperiments[i].pageView,
        shortDesc: allExperiments[i].shortDesc,
      };
      outputData.push(obj);
    }

    res
      .status(200)
      .json({ allExperiments: outputData, btns, ExperimentsNumber });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.searchExperiments = searchExperiments;
