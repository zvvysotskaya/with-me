const sanitizeHTML = require('sanitize-html')
const md5 = require('md5');
require('dotenv').config();
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectId
let db;
let connectionStrings = process.env.REACT_APP_DB_URL;
 mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    //assert.equal(null, err);
    db = client.db('WithMe');
 })

module.exports = function (app) {
    app.post('/post-post', function (req, res) {
        const safeTitle = sanitizeHTML(req.body.title, { allowedTags: [], allowedAttributes: {} })
        const safeBody = sanitizeHTML(req.body.body, { allowedTags: [], allowedAttributes: {} })        
        let _id = ObjectID(req.session.user._id)
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
            .then(() => (res.send('The post is created')))
            .catch((err) => console.log(err))  
    })
    app.get('/allPosts', function (req, res) {
        let myAggr = [
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'authorDocument' } },
            {
                $project: {
                    title: 1,
                    body: 1,
                    dateCreated: 1,
                    username: 1,
                    email: 1,
                    authorId:'$author',
                    author: { $arrayElemAt: ['$authorDocument', 0] },
                  
                }}
        ]
        db.collection('posts')
            .aggregate(myAggr)
            .toArray()
            .then(function (result) {
                if (result) {
                    res.send(result)
                }
            })
            .catch(err=>console.log(err))
    })
    app.post('/edit-post', function (req, res) {
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
            db.collection('posts')
                .findOneAndUpdate({ _id: new mongodb.ObjectId(req.body.id) }, { $set: { title: safeTitle.trim(), body: safeBody.trim() } })
                .then(()=>res.send('The post updated successfully!'))
                .catch(err => console.log(err))
        
    })
    app.post('/delete-post', function (req, res) {

        db.collection('posts')
        .deleteOne({ _id: new mongodb.ObjectId(req.body.id) },
            console.log('deleted!! (came from node.js id: ' + req.body.id + ')'))
            .then()
        .catch(err=>console.log(err ))
        
    })
    app.post('/search', function (req, res) {
        console.log('search is working')
        let searchTerm = req.body.searchTerm
        let myAggr
        if (typeof searchTerm == 'string') {
            myAggr = [
                { $match: { $text: { $search: searchTerm } } },
                { $sort: { score: {$meta:'textScore'}}}
            ]
        } else {
            res.send('We cannot make this apperation.')
        }
        db.collection('posts')
                .aggregate(myAggr)
                .toArray()
                .then(function (result) {
                    if (result) {
                        res.send(result)
                    }
                })
                .catch(err => console.log(err))
    })
    //follows collection
    app.post('/follow', function (req, res) {
        //1. validate
        let followedUsername = req.body.followedUserName
        let authorId = req.body.authorId
        if (typeof followedUsername != 'string') {
            followedUsername=''
        }
        //check if exists in db
        let followedAccount = db.collection('users').findOne({ username: followedUsername })
        if (followedAccount) {
            let followedId = req.session.user._id
            if (followedId != undefined) {
                db.collection('follows').insertOne({ followedId: followedId, authorId: new ObjectID(authorId) })
                    .then(res.send(`Successfully followed ${followedUserName}`))
                    .catch(error => console.log(error))
            }
        } else {
            res.send('You cannot follow a user that does not exist.')
        }
        
    })
    
}