const Rule = require("../models/Rule");
const { validationResult } = require("express-validator");

const getAllRules = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalRules = await Rule.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          typeOfRule: 1,
          createdAt: 1,
          situation: 1,
        });
      const AllRulesNumber = await (await Rule.find()).length;
      res.status(200).json({ GoalRules, AllRulesNumber });
    } else {
      const AllRules = await Rule.find().sort({ _id: -1 });
      res.status(200).json(AllRules);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllRules = getAllRules;

const newRule = async (req, res) => {
  ////// new simple method for create a Rule
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      await Rule.create(req.body);
      res.status(200).json({ msg: "قانون با موفقیت اضافه شد!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newRule = newRule;

const updateRule = async (req, res) => {
  ////// a simple method for update a Rule
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      await Rule.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ msg: "قانون با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.updateRule = updateRule;

const removeRule = async (req, res) => {
  ////// a simple method for remove a Rule
  try {
    await Rule.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "قانون با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeRule = removeRule;

const getOneRuleById = async (req, res) => {
  try {
    const goalId = req.params.id;
    const targetRule = await Rule.findById(goalId);
    res.status(200).json(targetRule);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneRuleById = getOneRuleById;

const getOneRule = async (req, res) => {
  try {
    const targetRule = await Rule.findOne({
      typeOfRule: req.params.type,
    });
    if (targetRule.situation == true) {
      // ADD ONE TO PAGE VIEW
      const newRule = {
        pageView: targetRule.pageView + 1,
      };
      await Rule.findByIdAndUpdate(targetRule._id, newRule, {
        new: true,
      });
      res.status(200).json(targetRule);
    } else {
      res.status(400).json({ msg: "قانون هنوز منتشر نشده است!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneRule = getOneRule;
