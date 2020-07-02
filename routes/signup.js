let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let User = require('./../models/user')

// get sign up page
router.get('/', function (req, res) {
    res.render('signup')
})

// post sign up page to sign up a new user
router.post('/', function (req, res) {
    // create a model of user by getting data from body
    let newUser = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    // save the new user in database
    newUser
        .save()
        .then(result => {
            // store the user in session
            req.session.user = newUser
            // print success message and redirect to home page
            console.log('New user signed up')
            res.redirect('/')
        })
        .catch(err => {
            // print error message and redirect to the same 
            // page if any error occured
            console.log(err)
            res.redirect('/signup')
        })

})

module.exports = router