const bcrypt = require('bcryptjs')
require('dotenv').config();
const md5 = require('md5');
const sanitizeHTML = require('sanitize-html')

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
    app.post('/create-user', function (req, res) {
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
    app.post('/login-user', function (req, res) {
            let password = req.body.password        
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
    })
    app.get('/logout', function (req, res) {
        req.session.destroy(function () {            
            res.send('You are now loggedout.')
        });
        
    })
    app.get('/aaa', function (req, res) {//this is to get only username
        if (req.session.user) {
            res.send(req.session.user.username)
            console.log()
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