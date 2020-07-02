let express = require('express')
let router = express.Router()
let multer = require('multer')
let path = require('path')
let sharp = require('sharp')
let fs = require('fs');
let mongoose = require('mongoose')
let Videogame = require('./../models/videogame')

let fileName

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        let randomName = Date.now() + path.extname(file.originalname)
        fileName = randomName
        cb(null, randomName)
    }
})

let upload = multer({
    storage: storage
});

router.get('/', function (req, res) {
    res.render('addgame')
})

router.post('/', upload.single('file-to-upload'), function (req, res) {
    try {
        // after uploading the file

        // resize the image
        sharp('public/images/' + fileName).resize({
                height: 630,
                width: 500
            }).toFile('public/images/resized' + fileName)
            .then((fileInfo) => {
                // then delete the original image
                fs.unlinkSync('public/images/' + fileName)
            })

        let newVideoGame = new Videogame({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: 'images/resized' + fileName
        })

        newVideoGame.save().then(result => {
                console.log('new game added')
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
            })

    } catch (err) {
        console.log(err)
    }
})

module.exports = router