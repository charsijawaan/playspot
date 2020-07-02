let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Videogame = require('./../models/videogame')

// view all games
router.get('/', function (req, res) {
    // query to find all games
    let allgamesQuery = Videogame.find({}).sort({
        'created_at': -1
    })
    // execute the query
    allgamesQuery.exec(function (err, allGames) {
        // if some error occurs
        if (err) {
            console.log(err)
        }
        // else load the page with all games on it
        else {
            res.render('allgames', {
                allGames: allGames
            })
        }
    })
})

module.exports = router