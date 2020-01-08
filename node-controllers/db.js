require('dotenv').config();
const mongodb = require('mongodb');
let db;
let connectionStrings = process.env.REACT_APP_DB_URL;
module.exports = mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    //assert.equal(null, err);
    db = client.db('WithMe');
    let app = require('../server')
    const port = process.env.PORT
    //  app.listen(port, error => { if (error) { throw error; } else { console.log('Server running on port ' + port) } })

})
