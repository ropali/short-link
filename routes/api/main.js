const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const bodyParser = require("body-parser");

const ShortUrls = require("../../models/ShortUrls");

// get base URL
const baseUrl = config.baseUrl;


router.get("/", (req, res, next) => {
  res.json({'msg': "Welcome to Short Link!"});
});

/**
 * @route POST api/short
 * @desc Short a given URL
 * @access public
 */
router.post("/api/short", (req, res, next) => {
  if (isEmpty(req.body)) {
    res
      .status(400)
      .json({ success: false, msg: "Data missing!", data: req.body });
  }

  const shortUrl = new ShortUrls({
    url: req.body.url,
    userid: req.body.userid
  });

  saveShortUrl(shortUrl, res)
});


router.get('/:id', (req, res, next) => {
  const urlCode = req.param("id")

  ShortUrls.findOne({ urlCode: urlCode }, (err, urlObj) => {
    if (err) {
      console.log(err)

      res.status(500).json({'success': false,'msg': 'Internal Server Error!'})
    }

    if (isEmpty(urlObj)) {
      res.status(404).json({'success': false,'msg': 'URL does not exist!'})
    }

    // Redirect to actual URL
    res.redirect(urlObj.url)
  })

})

function saveShortUrl(shortUlrObj, res) {
  // Generate a random string to replace the url
  let randomStr = generateRandomString();
  // Check if the random string already exist in DB
  ShortUrls.findOne({ urlCode: randomStr }, (err, url) => {
    if (err) {
      console.log(err);
    } else if (url == null || isEmpty(url)) {
      console.log("url obj", url, randomStr);

      shortUlrObj.urlCode = randomStr
      
      // Not a duplicate
      shortUlrObj.save(err => {
        if (err) {
          res.status(400).json({ success: true, msg: err });
        }
        res.status(400).json({ success: true, url: baseUrl + randomStr });
      });

    } else {
      // Generate random string already exist in the DB
      // Try once again
      saveShortUrl(shortUlrObj)
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
