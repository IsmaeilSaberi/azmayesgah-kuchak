const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Experiment = require("../models/Experiment");

const getAllUsers = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalUsers = await User.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          username: 1,
          email: 1,
          role: 1,
          viewed: 1,
          createdAt: 1,
        });
      const AllUsersNumber = await (await User.find()).length;
      res.status(200).json({ GoalUsers, AllUsersNumber });
    } else {
      const AllUsers = await User.find()
        .sort({ _id: -1 })
        .select({ password: false });
      res.status(200).json(AllUsers);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllUsers = getAllUsers;

//REGISTER USER
const registerUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      //CHECKING OF EQUATION OF PASSWORD AND CONFIRM PASSWORD
      if (req.body.password == req.body.rePassword) {
        //CHECKING OF EXISTANCE OF DUPLICATE EMAIL
        const emailExist = await User.find({ email: req.body.email });
        if (emailExist.length < 1) {
          //CHECKING OF EXISTANCE OF DUPLICATE USERNAME
          const usernameExist = await User.find({
            username: req.body.username,
          });
          if (usernameExist.length < 1) {
            //MAKING NEW USER
            const data = req.body;
            data.username = req.body.username
              .replace(/\s+/g, "_")
              .toLowerCase();
            data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
            data.password = req.body.password.replace(/\s+/g, "").toLowerCase();
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const newUser = new User({
              username: data.username,
              email: data.email,
              password: hashedPassword,
              role: "User",

              viewed: false,
              createdAt: new Date().toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              updatedAt: new Date().toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
            newUser
              .save()
              .then((d) => {
                //MAKING AUTH COOKIE
                const token = jwt.sign(
                  {
                    _id: newUser._id,
                    username: newUser.username,
                  },
                  process.env.TOKEN_SECRET
                );
                res
                  .status(200)
                  .json({ msg: "ثبت نام موفقیت آمیز بود!", auth: token });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          } else {
            res.status(422).json({ msg: "لطفا نام کاربری دیگری وارد کنید!" });
          }
        } else {
          res.status(422).json({ msg: "لطفا ایمیل دیگری وارد کنید!" });
        }
      } else {
        res.status(422).json({ msg: "تکرار رمز عبور اشتباه است!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.registerUser = registerUser;

//LOGIN USER
const loginUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      //CHECKING OF EXISTANCE OF DUPLICATE EMAIL
      const emailExist = await User.find({ email: req.body.email });
      if (emailExist.length > 0) {
        const theUser = emailExist[0];
        const data = req.body;
        data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
        data.password = req.body.password.replace(/\s+/g, "").toLowerCase();

        const validPassword = await bcrypt.compare(
          data.password,
          theUser.password
        );
        if (validPassword == false) {
          res.status(422).json({ msg: "ایمیل یا رمز عبور اشتباه است!" });
        } else {
          // MAKING AUTH TOKEN
          const token = jwt.sign(
            { _id: theUser._id, username: theUser.username },
            process.env.TOKEN_SECRET
          );
          res
            .status(200)
            .json({ msg: "با موفقیت وارد حساب کاربری شدید!", auth: token });
        }
      } else {
        res.status(422).json({ msg: "لطفا ثبت نام کنید!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.loginUser = loginUser;

const updateUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.username = req.body.username.replace(/\s+/g, "_").toLowerCase();
      data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
      await User.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({ msg: "کاربر با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateUser = updateUser;

const updateMiniUser = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (req.body.email || req.body.viewed) {
        res.status(400).json({ msg: "خطا در اطلاعات فرستاده شده!" });
      } else {
        if (req.body.password == req.body.rePassword) {
          const data = req.body;
          const newPass = req.body.password.replace(/\s+/g, "").toLowerCase();
          data.password = await bcrypt.hash(newPass, 10);
          data.updatedAt = new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          await User.findByIdAndUpdate(req.params.id, data, {
            new: true,
          });
          return res
            .status(200)
            .json({ msg: "اطلاعات شما با موفقیت آپدیت شد!" });
        } else {
          return res.status(422).json({ msg: "تکرار رمز عبور اشتباه است!" });
        }
      }
      return res.status(200).json({ msg: "اطلاعات شما با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateMiniUser = updateMiniUser;

const removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "کاربر با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removeUser = removeUser;

const getOneUserById = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id).select({
      password: false,
    });

    res.status(200).json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOneUserById = getOneUserById;

// FOR LOGIN REGISTER AND REDIRECT
const getUserDataAccount = async (req, res) => {
  try {
    const targetUser = await User.findById(req.user._id).select({ _id: 1 });
    res.status(200).json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getUserDataAccount = getUserDataAccount;

// FOR ADMIN REDIRECT
const getUserAdminData = async (req, res) => {
  try {
    const targetUser = await User.findById(req.user._id).select({ _id: 1 });
    res.status(200).json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getUserAdminData = getUserAdminData;

// ACCOUNT AND CART PAGE
const getPartOfUserData = async (req, res) => {
  try {
    const theSlug = req.params.slug;
    if (theSlug == "info") {
      const targetUser = await User.findById(req.user._id).select({
        username: 1,
        email: 1,
        role: 1,
        updatedAt: 1,
      });
      res.status(200).json(targetUser);
    } else if (theSlug == "experiments") {
      const targetUser = await User.findById(req.user._id).select({
        username: 1,
        experiments: 1,
      });
      res.status(200).json(targetUser);
    } else {
      res.status(200).json({ msg: "عدم تعیین بخش مورد نیاز!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getPartOfUserData = getPartOfUserData;

const searchUsers = async (req, res) => {
  try {
    const theUser = await User.find({ email: req.body.email }).select({
      _id: true,
    });
    if (theUser.length > 0) {
      res.status(200).json({ userData: theUser[0] });
    } else {
      res.status(200).json({ userData: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.searchUsers = searchUsers;

//HEADER DISPLAYNAME
const getDisplayname = async (req, res) => {
  try {
    let token = req.cookies.auth_cookie;
    if (!token) {
      token = req.headers.auth_cookie;
    }
    if (!token) {
      res.status(200).json({ displayName: "" });
    } else {
      try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const displayname = await User.findById(verified._id).select({
          username: 1,
        });
        res.status(200).json({ displayName: displayname });
      } catch (error) {
        console.log(error);
        res.status(200).json({ displayName: "" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getDisplayname = getDisplayname;

const getNewItems = async (req, res) => {
  try {
    const newUsers = await User.find({ viewed: false });
    const newExperiments = await Experiment.find({ viewed: false });

    const sendingData = {
      newUsersNumber: newUsers.length,
      newExperimentsNumber: newExperiments.length,
    };
    res.status(200).json(sendingData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getNewItems = getNewItems;
