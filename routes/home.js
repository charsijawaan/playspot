let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Videogame = require('./../models/videogame')

// get home page
router.get('/', function (req, res) {

  // query for finding the latest games
  let getNewGamesQuery = Videogame.find({}).limit(4).sort({
    'created_at': -1
  })
  // execute the query
  getNewGamesQuery.exec(function (err, newGames) {
    // if some error occurs
    if (err) {
      console.log(err)
    } else {
      // if session exists login to account and show
      // home page with new games
      if (req.session.user) {
        res.render('home', {
          sessionExists: true,
          newGames: newGames
        })
      }
      // else simply show the default home page
      // with new games
      else {
        res.render('home', {
          newGames: newGames
        })
      }
    }
  })
});

module.exports = router