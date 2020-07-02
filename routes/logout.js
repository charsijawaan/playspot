let express = require('express')
let router = express.Router()

// logout of account
router.get('/', function(req, res) {
    // if session exists destroy it
    if(req.session.user) {
        req.session.destroy( () => {
            // then redirect to login page
            res.redirect('/login')
        })
    }    
})

module.exports = router