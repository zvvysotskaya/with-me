const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
//const sanitizeHTML = require('sanitize-html')

require('dotenv').config();
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
let sessionOptions = session({
    secret: 'keyboard cat',
 //   store: new MongoStore(),
    store: new MongoStore({
        url: process.env.REACT_APP_DB_URL
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})


const compression = require('compression')
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/public'));
app.use(sessionOptions)

app.use(compression())

const apiController = require('./node-controllers/apiController')
apiController(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
if (process.env.NODE_ENV != 'production') {
    app.use(express.static(path.join(__dirname, 'client/public')));

    app.get('/', function (req, res) {
        res.sendFile(__dirname, 'client/public', 'index.html');
    })
    require('dotenv').config();
};

module.exports = app

