const bcrypt = require('bcryptjs')
require('dotenv').config();
const session = require('express-session')
const md5 = require('md5');

const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
let db;
let connectionStrings = process.env.REACT_APP_DB_URL
mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    //assert.equal(null, err);
    db = client.db('WithMe');
    let app = require('../server')
    const port = process.env.PORT
    app.listen(port, error => { if (error) { throw error; } else { console.log('Server running on port ' + port) } })

})

module.exports = function (app) {
    app.post('/create-user', function (req, res) {
    //    let safeText = sanitizeHTML(req.body.item, { allowedTags: [], allowedAttributes: {} })
        //hash user password
        let salt = bcrypt.genSaltSync(10)
        let password = bcrypt.hashSync(req.body.password, salt)

        let data = {
            username: req.body.username,
            email: req.body.email,
            password: password
        }
       // console.log(data)
        

        db.collection('users').insertOne(data)
    })
    app.post('/login-user', function (req, res) {
       
            let password = req.body.password        
        db.collection('users').findOne({ email: req.body.email }, (error, attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(password, attemptedUser.password)) {
                req.session.user = { email: req.body.email, avatar: `https://gravatar.com/avatar/${md5(req.body.email)}?s=128`, password: req.body.password, _id: ObjectID(attemptedUser._id) }
                // req.session.user.save()  
                
                if (req.session.user) {
                    console.log('Hello from Session ' + req.session.id + ' ' + req.session.user)
                    
                }
                    console.log('Congrats!')
                    res.send('Congrats!')
                 //   res.redirect('/sign-up-page')
                } else {
                    console.log('Invalid pasword / email!')
                    res.send('Invalid pasword / email!')
                }
            })
    })
    app.get('/logout', function (req, res) {
        req.session.destroy(function () {            
            res.send('You are now loggedout.')
        });
        
    })
    app.get('/aaa', function (req, res) {//this is to take something from session
        if (req.session.user) {
            res.send(req.session.id + ' user email ' + req.session.user.email + ' password: ' + req.session.user.password + ' avatar: ' + req.session.user.avatar + ' _id: ' + req.session.user._id)
            console.log()
        }
    }) 
    app.get('/avat', function (req, res) {
        if (req.session.user) {
            res.send(req.session.user.avatar)
        }
    })
    app.get('/bbb', function (req, res) {
        if (req.session.user) {
            res.send('hello, there')
        }
    })
    


}