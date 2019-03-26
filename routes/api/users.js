const express = require('express')
const router = express.Router()

const User = require('../../models/User')

const bcrypt = require('bcryptjs')

/**
 * @router POST
 * @access public
 * @desc user signup 
 */

router.post('/signup', (req, res, next) => {
    if (!req.body) res.status(500).json({success: false, msg: 'No data found!'})

    const { name, email, password, confirm_password } = req.body

    if ( name === "" || email === "" || password === "" || confirm_password === "" ) {
        res.status(500).json({success: false, msg: 'No data found!'})
    }

    if (password !== confirm_password) {
        res.status(200).json({success: false, msg: 'Passowrd did not match!'})
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
        name: toUpperCaseWords(name),
        email,
        password: hash
    })


    newUser.save()
            .then(user => {
                res.status(200).json({success: true, msg: 'User created successfully!',data: user})
            })
            .catch(err => {
                res.status(200).json({success: false, msg: 'Internal Server Error!'})
            })

})

/**
 * @router POST
 * @access public
 * @desc user login
 */
router.post('/login', (req, res, next) => {
    if (!req.body) res.status(500).json({success: false, msg: 'No data found!'})

    const { email, password } = req.body

    if ( email === "" || password === "") {
        res.status(500).json({success: false, msg: 'No data found!'})
    }

    User.findOne({ email: email })
        .then(user => {
            console.log(user);
            if (user === null) {
                res.status(200).json({success: false, msg: "User with this email does not exist!"})
            }
            res.status(200).json({success: true, msg: "user logged in", data: { id: user._id, name:user.name,email:user.email } })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({success: false, msg: 'No data found!'})
        })
})


function toUpperCaseWords(str) {
    return str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}



module.exports = router