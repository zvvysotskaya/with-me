const sanitizeHTML = require('sanitize-html')
const md5 = require('md5');
//tokens
const csrf = require('csurf')
const protect = csrf()

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

    app.get('/getCSRF', protect, function (req, res) {
        let token = req.csrfToken()
        res.send(token)
        console.log('CSRF token***: ' + token)
    })
    app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err)
        res.send('Cross site request forgery detected.')
    })

    app.post('/post-post', protect, function (req, res) {
        try {
            const safeTitle = sanitizeHTML(req.body.title, { allowedTags: [], allowedAttributes: {} })
            const safeBody = sanitizeHTML(req.body.body, { allowedTags: [], allowedAttributes: {} })

            let _id = ObjectID(req.session.user._id)
            console.log("*********** _id: " + _id)
            if (_id == undefined) {

                res.send('You must be loggedin!')
                return
            }
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
        } catch {
            res.send("Sorry, you must be loggedin.")
        }
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
    app.post('/edit-post', protect, function (req, res) {
        try {
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
                .then(() => res.send('The post updated successfully!'))
                .catch(err => console.log(err))
        } catch{
            res.send("You cannot edit the post. It is private.")
        }
    })
    app.post('/delete-post', protect, function (req, res) {
        db.collection('posts')
        .deleteOne({ _id: new mongodb.ObjectId(req.body.id) },
            console.log('deleted!! (came from node.js id: ' + req.body.id + ')'))
            .then(res.send(`The post ${req.body.id} successfully deleted.`))
        .catch(err=>console.log(err ))
    })
    app.post('/search', protect, function (req, res) {
        console.log('search is working')
        let searchTerm = req.body.searchTerm
        let myAggr
        if (typeof searchTerm == 'string') {
            myAggr = [
                { $match: { $text: { $search: searchTerm } } },
                { $sort: { score: {$meta:'textScore'}}}
            ]
        } else {
            res.send('We cannot make this aperation.')
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
    app.post('/follow', protect, function (req, res) {
        //1. validate
        let followedUsername = req.body.follower
        let authorIdRequest = ObjectID(req.body.authorId)
        if (typeof followedUsername != 'string') {
            followedUsername=''
        }
        db.collection('users').findOne({ username: followedUsername }, (err, attemptedUsename) => {
           if (err) throw err;
            console.log('att: ' + attemptedUsename.username + ' ' + attemptedUsename._id)
            if (attemptedUsename.username) {
                let followerSessionId = ObjectID(req.session.user._id)
                //check if follower already follows the profile owner
                db.collection('follows').find({ follower: followerSessionId }).toArray((err, result) => {
                    if (err) throw err
                    if (result === null) {
                         db.collection('follows').insertOne({ follower: followerSessionId, authorId: authorIdRequest })
                             .then(res.send(`Successfully followed ${followedUsername}`))
                             .catch()
                    } 
                    let txt =[]
                    if (result != null) {
                        for (let i in result) {
                            txt.push((result[i].authorId))
                        }
                        
                        let aa = txt.toString().includes(authorIdRequest)
                        if (!aa) {
                            db.collection('follows').insertOne({ follower: followerSessionId, authorId: authorIdRequest })
                                .then(res.send(`Successfully followed ${followedUsername}`))
                                .catch()
                        }
                        if (aa) {
                            res.send('You are already following this user.')
                        }
                     }
                })
            } else {
                res.send('You cannot follow a user that does not exist.')
            }
        })
    })
    app.post('/deleteFollow', protect , function (req, res) {
        let followerSessionId = req.session.user._id
        let authorIdRequest = req.body.id
        let query = {
            follower: ObjectID(followerSessionId)
        }
        console.log('follower:' + followerSessionId + 'author: ' + authorIdRequest)
        db.collection('follows').find(query).toArray((err, result) => {//find the following owner id to remove from the follower account
            if (err) throw err
            let arr
            let txt = []
            for (arr in result) {
                txt.push(result[arr].authorId)
            }
            let isAuthor = txt.filter(el => el.toString() === authorIdRequest.toString())
            // find the owner's _id

            db.collection('follows').find({ $and: [{ follower: ObjectID(followerSessionId) }, { authorId: ObjectID(isAuthor[0]) }] }).toArray((err, result) => {
                if (err) throw err
                let arr
                let txt = []
                for (arr in result) {
                    txt.push(result[arr]._id)
                }
                //delete the owner account found by owner's _id
                console.log('TXT: '+txt)
                if (txt.length > 0) {
                    db.collection('follows')
                        .deleteOne({ _id: new mongodb.ObjectId(txt[0]) })
                        .then(res.json('The user is successfully deleted.'))
                        .catch(er => console.log(er))
                } else {
                    res.send('We cannot delete this account.')
                }
            })
        })
    })
    function followingFollower(req, res, followingOrFollower,reqBodyUsername) {
        if (req.session.user) {
            let following = reqBodyUsername
            let myaggr = [
                {
                    $lookup: {
                        from: 'users', localField: followingOrFollower, foreignField: '_id', as: 'userDoc'//should be 'follower' or 'authorId'(authorId is for the follower page) in localField
                    }
                },
                {
                    $project: {
                        "authorId": 1,
                        'follower': 1,
                        'username': { $arrayElemAt: ["$userDoc.username", 0] },
                        'email': { $arrayElemAt: ['$userDoc.email', 0] },
                        'userID': { $arrayElemAt: ['$userDoc._id', 0] }
                    }
                }
            ]
            console.log('following: '+following)
            db.collection('follows').aggregate(myaggr).toArray(function (er, resp) {
                if (er) throw er
                if (resp) {
                    let followingSelected = resp.filter(el => {
                        if (el.username != undefined || following != undefined) {
                            return el.username === following.toString()//following is req.body.username or req.session.user.username
                }
                    })
                    let txt = []
                    for (let i = 0; i < followingSelected.length; i++) {
                        let names = resp.find(el => {
                            if (el.userID != undefined || followingSelected[i].authorId != undefined) {
                                return el.userID.toString() === followingSelected[i].authorId.toString()
                            } else {
                                console.log('Not loggedin.')
                            }
                    })                     
                        txt.push(names)
                    }                  
                    res.json(txt)
                }
            })
        }
    }
    app.post('/allFollowing', function (req, res) {//this is disigned for following page only to find following but not to show and hide button 'following'
        if (req.session.user) {
            if (req.body != undefined) {
                followingFollower(req, res, 'follower', req.body.username)
                console.log('!!!!!!! loggedin User:' + req.body.username)
            } else {
                console.log('not loggedin')
                return
            }
        }
    })
    app.post('/allFollowingButton', function (req, res) {//this is for the following button of the profile page
        if (req.session.user != undefined) {
            followingFollower(req, res, 'follower', req.session.user.username)
        } else {
            console.log('Not loggedin')
            return
        }
    })
    app.post('/allFollowers', function (req, res) {
      //  if (req.session.user) {
            let following = req.body.username
            let myaggr = [
                {
                    $lookup: {
                        from: 'users', localField: 'authorId', foreignField: '_id', as: 'userDoc'//should be 'follower' or 'authorId'(authorId is for the follower page) in localField
                    }
                },
                {
                    $project: {
                        "authorId": 1,
                        'follower': 1,
                        'username': { $arrayElemAt: ["$userDoc.username", 0] },
                        'email': { $arrayElemAt: ['$userDoc.email', 0] },
                        'userID': { $arrayElemAt: ['$userDoc._id', 0] }
                    }
                }
            ]
            db.collection('follows').aggregate(myaggr).toArray(function (er, resp) {
                if (er) throw er
                if (resp) {
                    let followingSelected = resp.filter(el => {
                        if (el.username != undefined || following != undefined) {
                            return el.username === following.toString()//following is req.body.username or req.session.user.username
                        }
                    }) 
                    let txt = []
                    for (let i = 0; i < followingSelected.length; i++) {
                        let names = resp.find(el => {
                            if (el.userID != undefined || followingSelected[i].follower != undefined) {
                                return el.userID.toString() === followingSelected[i].follower.toString()
                            } else {
                                console.log('Not loggedin.')
                            }
                        })
                        txt.push(names)
                    }
                    res.json(txt)
                }
            })
       // }
    })
}