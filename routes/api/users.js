const express = require('express')
const router = express.Router()

const User = require('../../models/User')

const bcrypt = require('bcryptjs')

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


function toUpperCaseWords(str) {
    return str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}



module.exports = router