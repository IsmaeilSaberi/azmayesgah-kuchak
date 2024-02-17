const express = require("express");
const router = express();
const { check } = require("express-validator");

const isAdmin = require("../middlewares/isAdmin");

const RuleCtrl = require("../controllers/RuleCtrl");

router.get("/rules", isAdmin, RuleCtrl.getAllRules);

router.post(
  "/new-rule",
  isAdmin,
  [check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean()],
  RuleCtrl.newRule
);

router.post(
  "/update-rule/:id",
  isAdmin,
  [check("situation", "فرمت بخش انتشار اشتباه است!").isBoolean()],
  RuleCtrl.updateRule
);

router.post("/remove-rule/:id", isAdmin, RuleCtrl.removeRule);
router.get("/get-rule-by-id/:id", isAdmin, RuleCtrl.getOneRuleById);
router.get("/get-rule/:type", RuleCtrl.getOneRule);

module.exports = router;
