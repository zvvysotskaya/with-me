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
const ifUserExists = require('./functions')

module.exports = function (app) {
    app.post('/post-post', function (req, res) {
        const safeTitle = sanitizeHTML(req.body.title, { allowedTags: [], allowedAttributes: {} })
        const safeBody = sanitizeHTML(req.body.body, { allowedTags: [], allowedAttributes: {} })
        let title = req.body.title
        let body = req.body.body
        let _id = ObjectID(req.session.user._id)
        //    validate(title, body)
        if (safeTitle == '') {       
            res.send('You must provide a title.')
            return
        }
        if (safeBody == '') {
            res.send('You must provide a post content.')
            return
        }
        let data = {
            title: safeTitle.trim(),
            body: safeBody.trim(),
            dateCreated: new Date(),
            author: _id
        }
        if (typeof (title) != 'string') {
            title = ''
            return
        }
        if (typeof (body) != 'string') {
            body = ''
            return
        }
        db.collection('posts').insertOne(data)
        res.send('The post is created')
    })
    
    app.get('/singlePost', function (req, res) {
        let id = req.params.id
        console.log('id is: '+id)
 //       db.collection('posts').findOne({ _id: new ObjectID('5e156c8ad0ddfeeb95d05864') }, function (err, result) {
 //           res.send(result)
 //           console.log(result)
 //       })
        function findSinflePost(id) {
            return new Promise(async function (resolve, reject) {
               if (typeof (id) != 'string' || !ObjectID.isValid(id)) {
                    reject()
                }
                let posts = await db.collection('posts').aggregate([
                    { $match: { _id: new ObjectID('5e156c8ad0ddfeeb95d05864') } },
                    { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'authorDocument' } },
                    {
                        $project: {
                            title: 1,
                            body: 1,
                            createdDate: 1,
                            author: {$arrayElemAt: ['$authorDocument',0]}
                        }}
                ]).toArray()
                //clean up author property
                posts = posts.map(function (post) {
                    post.author = {
        //                email: 
   //                     username:
               //        avatar: `https://gravatar.com/avatar/${md5(req.body.email)}?s=128`
                    }
                    return posts
                })
                
                if (posts.length) {
                    console.log(posts[0])
                    resolve(posts[0])
                } else {
                    reject()
                }
            })
      }
       async function viewSinglePost(req, res) {
           try {
               await findSinflePost('5e156c8ad0ddfeeb95d05864')
           } catch (error) {
               console.log('Hello there is an error!!!'+error)
        }
      }
     viewSinglePost(req, res)
    })
    app.get('/profile', function (req, res) {


    })

    app.post('/findByEmail', function (req, res) {
        function findByUsename(usename) {
            return new Promise(function (resolve, reject) {
                if (typeof (username) != 'string') {
                    reject()
                    return
                }
                db.collection('users').findOne({ username: username })
                    .then(function (userDoc) {
                        if (userDoc) {
                            userDoc = {
                                _id: userDoc._id,
                                username: userDoc.username,
                                avatar: userDoc.avatar
                            }
                            resolve(userDoc)
                        } else {
                            reject()
                        }
                    })
                    .catch(function () {
                        reject()
                    })

            })
        }

    });
    app.get('/allPosts', function (req, res) {
        let myAggr = [
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'authorDocument' } },
            {
                $project: {
                    title: 1,
                    body: 1,
                    dateCreated: 1,
                   // username: 1,
                    authorId:'$author',
                    author: { $arrayElemAt: ['$authorDocument', 0] }
                }}
        ]
        db.collection('posts')
            .aggregate(myAggr)
            .toArray()
            .then(function (result) { res.send(result) })
            .catch(err=>console.log(err))
    })
    
}