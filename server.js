const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
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
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('client/public'));
app.use(sessionOptions)



app.use(compression())

const userController = require('./node-controllers/userController')
userController(app)
const postController = require('./node-controllers/postController')
postController(app)

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
app.all('*', (req, res) => {
    res.send('<h1>Woops, we cannot find that page</h1>')
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('chatMessageFromBrowser', function (data) {
        console.log('Data from browser!!!!!!!!!!!!!! ' + data.chatMessage+' username: '+data.userName+''+data.userEmail)
        //broadcast data to all connected users. If use io then all data willbe send to all connected users!!!important
        io.emit('chatMessageFromServer', { message: data.chatMessage , username: data.userName, useremail: data.userEmail})
        
    })
});

module.exports = server

