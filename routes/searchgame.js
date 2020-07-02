let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Videogame = require('./../models/videogame')

// view searched game
router.get('/', function (req, res) {
    // query to find the searched game
    let allGamesQuery = Videogame.find({
        name: {
            '$regex': req.query.search,
            '$options': 'i'
        }
    })
    // execute the query
    allGamesQuery.exec(function (err, searchedGames) {
        // if error
        if (err) {
            console.log(err)
        }
        // else show the matching games
        else {
            res.render('searchgame', {
                searchedGames
            })
        }
    })
})

module.exports = router