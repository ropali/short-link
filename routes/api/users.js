const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @router POST
 * @access public
 * @desc user signup
 */

router.post("/signup", (req, res, next) => {
  if (!req.body)
    res.status(500).json({ success: false, msg: "No data found!" });

  const { name, email, password, confirm_password } = req.body;

  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirm_password === ""
  ) {
    res.status(500).json({ success: false, msg: "No data found!" });
  }

  if (password !== confirm_password) {
    res.status(200).json({ success: false, msg: "Passowrd did not match!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name: toUpperCaseWords(name),
    email,
    password: hash
  });

  newUser
    .save()
    .then(user => {
      res
        .status(200)
        .json({ success: true, msg: "User created successfully!", data: user });
    })
    .catch(err => {
      res.status(200).json({ success: false, msg: "Internal Server Error!" });
    });
});

/**
 * @router POST
 * @access public
 * @desc user login
 */
router.post("/login", (req, res, next) => {
  if (!req.body)
    res.status(500).json({ success: false, msg: "No data found!" });

  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(500).json({ success: false, msg: "No data found!" });
  }

  User.findOne({ email: email })
    .then(user => {
      console.log(user);
      if (user === null) {
        res
          .status(200)
          .json({
            success: false,
            msg: "User with this email does not exist!"
          });
      }

      const data = { id: user._id, name: user.name, email: user.email }
      // generate jwt token it send that as response
      const token = jwt.sign(data, process.env.SECRET_KEY)

      res
        .status(200)
        .json({
          success: true,
          msg: "user logged in",
          data: { token }
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ success: false, msg: "No data found!" });
    });
});

/**
 * @router GET
 * @access private
 * @desc user dashboard
 */
router.get('/dashboard', (req, res, next) => {
    const token = req.body.token

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(payload)
    })
})


function toUpperCaseWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

module.exports = router;
