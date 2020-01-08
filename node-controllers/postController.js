require('dotenv').config();
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectId
let db;
let connectionStrings = process.env.REACT_APP_DB_URL;
module.exports = mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    //assert.equal(null, err);
    db = client.db('WithMe');
})


module.exports = function (app) {
    app.post('/post-post', function (req, res) {
        let title = req.body.title
        let body = req.body.body
        let _id = ObjectID(req.session.user._id)
    //    validate(title, body)
        if (title == '') {       
            res.send('You must provide a title.')
            return
        }
        if (body == '') {
            res.send('You must provide a post content.')
            return
        }
        let data = {
            title: title.trim(),
            body: body.trim(),
            dateCreated: new Date(),
            author: _id
        }
        if (typeof (title) != 'string') {
            title = ''
        }
        if (typeof (body) != 'string') {
            body = ''
        }
        db.collection('posts').insertOne(data)
        res.send('The post is created')
    })
    
}