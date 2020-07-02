let mongoose = require('mongoose')

let videogameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    category: String,
    price: Number,
    image: String
}, {
    timestamps: {
        createdAt: 'created_at'
    }
})

module.exports = mongoose.model('Videogame', videogameSchema)