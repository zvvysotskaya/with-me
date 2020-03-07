const bcrypt = require('bcryptjs')
require('dotenv').config();
const md5 = require('md5');
const sanitizeHTML = require('sanitize-html')
//tokens
const csrf = require('csurf')
const protect = csrf()

const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
let db;
let connectionStrings = process.env.REACT_APP_DB_URL
mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {    
    db = client.db('WithMe');
    let app = require('../server')
    const port = process.env.PORT
    app.listen(port, error => { if (error) { throw error; } else { console.log('Server running on port ' + port) } })
})

module.exports = function (app) {
  //  app.use(protect)
    app.get('/getCSRF', protect, function (req, res) {
        let token = req.csrfToken()
        res.send(token)
        console.log('CSRF token***: ' + token)
    })
    app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err)
        // handle CSRF token errors here
        //   res.status(403)
        res.send('Cross site request forgery detected.')
    })
    app.post('/create-user',protect, function (req, res) {
        let safeUsername = sanitizeHTML(req.body.username, { allowedTags: [], allowedAttributes: {} })
        //hash user password
        let salt = bcrypt.genSaltSync(10)
        let password = bcrypt.hashSync(req.body.password, salt)
        let data = {
            username: safeUsername.trim(),
            email: req.body.email,
            password: password
        }
        db.collection('users').insertOne(data)
    })
    app.post('/login-user',protect, function (req, res) {
        
        console.log("Login Page working!!!!!!!!!!!!")
  //      console.log('Cookies: ', req.cookies);
        let password = req.body.password 
        let csrfBody = req.body._csrf
        // let csrf2 = req.csrfToken()
        console.log('CSRF$$$$: ' + ' body: ' + csrfBody)
     //   if (csrf2) {
            db.collection('users').findOne({ email: req.body.email }, (error, attemptedUser) => {
                if (attemptedUser && bcrypt.compareSync(password, attemptedUser.password)) {
                    req.session.user = {
                        email: req.body.email,
                        avatar: `https://gravatar.com/avatar/${md5(req.body.email)}?s=128`,
                        _id: ObjectID(attemptedUser._id),
                        username: attemptedUser.username
                    }
                    // req.session.user.save()  

                    if (req.session.user) {
                        console.log('Hello')
                    }
                    res.send('Congrats!')
                } else {
                    res.send('Invalid pasword / email!')
                }
            })
      //  } else {
      //      res.send('Invalid!!!!')
      //  }
    })
    app.get('/logout', protect, function (req, res) {
        req.session.destroy(function () {            
            res.send('You are now loggedout.')
        });
        
    })
    app.get('/aaa', function (req, res) {//this is to get only username
        if (req.session.user) {
            res.send(req.session.user.username)
        }
    })
    app.get('/userem', function (req, res) {
        if (req.session.user) {
            res.send(req.session.user.email)
        }
    })
    app.get('/avat', function (req, res) {
        if (req.session.user) {
            res.send(req.session.user.avatar)
        }
    })
    app.get('/bbb', function (req, res) {//only check if anyone is loggedin
        if (req.session.user) {
            res.send('hello, there')
        }
    })
    app.get('/loggedUserId', function (req, res) {
        if (req.session.user) {
            res.send(req.session.user._id)
        }
    })


}