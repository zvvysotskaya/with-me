const sanitizeHTML = require('sanitize-html')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config();
//mongodb
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectId
let db;
let connectionStrings = process.env.REACT_APP_DB_URL;
mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    db = client.db('WithMe');
})
module.exports = function (app) {
     
    app.post('/api/login-user', function (req, res) {
        let password = req.body.password 
        db.collection('users').findOne({ email: req.body.email }, (error, attemptedUser) => {
            if (error) throw error
            if (attemptedUser && bcrypt.compareSync(password, attemptedUser.password)) {
                res.json(jwt.sign({ email: req.body.email }, process.env.REACT_APP_JWTSECRET, { expiresIn: '1d' }))
            } else {
                res.send('Invalid pasword / email!')
            }
        })
    })

    app.post('/api/post-post', function (req, res) {     
        try {
            let apiUser = jwt.verify(req.body.token, process.env.REACT_APP_JWTSECRET)
            //find _id by email(apiUser.email) in db to insert in post as author
            db.collection('users').findOne({ email: apiUser.email }, (err, attemptedEmail) => {
                if (err) throw err
                let _id = ObjectID(attemptedEmail._id)
                const safeTitle = sanitizeHTML(req.body.title, { allowedTags: [], allowedAttributes: {} })
                const safeBody = sanitizeHTML(req.body.body, { allowedTags: [], allowedAttributes: {} })    
                if (req.body.title === '') {
                    res.send('You must provide a title.')
                    return
                }
                if (req.body.body === '') {
                    res.send('You must provide a post content.')
                    return
                }
                let data = {
                    title: safeTitle.trim(),
                    body: safeBody.trim(),
                    dateCreated: new Date(),
                    author: _id
                }
                db.collection('posts').insertOne(data)
                    .then(() => (res.send('The post is created ' + _id + '' + apiUser._id + ' ' + req.body.token._id)))
                    .catch((err) => console.log(err))
            })
        } catch{
            res.send("Invalid token")
        }
    })   
}