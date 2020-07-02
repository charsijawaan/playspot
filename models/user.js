let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('User', userSchema)

