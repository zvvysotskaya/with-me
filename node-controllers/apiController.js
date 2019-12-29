
require('dotenv').config();
const mongodb = require('mongodb');
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
        let data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
       // console.log(data)
        db.collection('users').insertOne(data)
    })
    app.post('/login-user', function (req, res) {
       
            let password = req.body.password        
            db.collection('users').findOne({ email: req.body.email }, (error, attemptedUser) => {
                if (attemptedUser && password == attemptedUser.password) {
                    console.log('Congrats!')
                    res.send('Congrats!')
                 //   res.redirect('/sign-up-page')
                } else {
                    console.log('Invalid pasword / username!')
                    res.send('Invalid pasword / username!')
                }
            })
        })
        
   


}