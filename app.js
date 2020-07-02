let express = require('express')
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')
let hbs = require('hbs')
let app = express()
let mongoose = require('mongoose')


// database connection
mongoose.connect('mongodb+srv://charsijawaan:Createyour1@playspotdb-re3f7.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// routes
let homeRouter = require('./routes/home')
let signupRouter = require('./routes/signup')
let loginRouter = require('./routes/login')
let logoutRouter = require('./routes/logout')
let addgameRouter = require('./routes/addgame')
let allgamesRouter = require('./routes/allgames')
let searchgameRouter = require('./routes/searchgame')

// view engine setup
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// use middlewares
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next()
})
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(expressSession({
    secret: 'max',
    saveUninitialized: false,
    resave: false
}));
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

// use routes
app.use('/', homeRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/addgame', addgameRouter)
app.use('/allgames', allgamesRouter)
app.use('/searchgame', searchgameRouter)

module.exports = app;