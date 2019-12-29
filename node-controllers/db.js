const mongodb = require('mongodb');
require('dotenv').config();
const connectionStrings = process.env.REACR_APP_DB_URL;
    //process.env.REACT_APP_DB_URL;
mongodb.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    //assert.equal(null, err);

    module.exports = client.db();

    let app = require('../server')
    const port = process.env.PORT || 5000
    app.listen(port, error => { if (error) { throw error; } else { console.log('Server running on port ' + port) } })

})