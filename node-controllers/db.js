const mongoDB = require('mongodb');
const connectionStrings = process.env.REACT_APP_DB_URL;
mongoDB.connect(connectionStrings, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    module.exports = client.db()
    let app = require('./server')
    const port = process.env.PORT || 5000
    app.listen(port, error => { if (error) { throw error; } else { console.log('Server running on port ' + port) } })

})