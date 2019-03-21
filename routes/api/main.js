const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const bodyParser = require("body-parser");

const ShortUrls = require("../../models/ShortUrls");

// get base URL
const baseUrl = config.baseUrl;

// router.use(bodyParser.json())

router.get("/", (req, res, next) => {
  res.send("Welcome to Short Link!");
});

/**
 * @route POST api/short
 * @desc Short a given URL
 * @access public
 */
router.post("/short", (req, res, next) => {
  if (isEmpty(req.body)) {
    res
      .status(400)
      .json({ success: false, msg: "Data missing!", data: req.body });
  }

  // Generate a URL code
  const urlCode = generateRandomString()//getCodeForUrl();

  const shortUrl = new ShortUrls({
    url: req.body.url,
    urlCode: urlCode,
    userid: req.body.userid
  });

  shortUrl.save(err => {
    if (err) {
      res.status(400).json({ success: true, msg: err });
    }

    res.status(400).json({ success: true, url: baseUrl + urlCode });
  });
});

function getCodeForUrl() {
  // Generate a random string to replace the url
  let randomStr = generateRandomString();
  // Check if the random string already exist in DB
  ShortUrls.findOne({ urlCode: randomStr }, (err, url) => {
    if (err) {
      console.log(err);
    } else if (url == null || isEmpty(url)) {
      console.log("url obj", url, randomStr);
      return randomStr;
    } else {
      getCodeForUrl();
    }
  });
}

function generateRandomString() {
  var length = 6,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function isEmpty(obj) {
  if (obj == null) return true;
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

module.exports = router;
