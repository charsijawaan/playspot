let express = require('express')
let router = express.Router()
let User = require('./../models/user')

// get login page
router.get('/', function (req, res) {
    res.render('login')
})

// post login up page
router.post('/', function (req, res) {
    // make query to find the user with matched email and password
    let findUserQuery = User.findOne({
        'email': req.body.email,
        'password': req.body.password
    })
    // execute the query
    findUserQuery.exec(function (err, user) {
        // if some error occurs
        if (err) {
            console.log(err)
        }
        // if email and password matches
        // start seassion and redirect to home page
        if (user) {
            console.log(user)
            req.session.user = user
            res.redirect('/')
        }
        // if email and password does not match
        // reload the login page
        else {
            console.log(user)
            res.redirect('/login')
        }
    })
})

module.exports = router