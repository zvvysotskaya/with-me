exports.profilePostScreen = function (req, res) {

}
exports.ifUserExists = function (req, res, next) {
    findByUserName(req.params.username)
        .then(function (userDocument) {
            req.profileUser = userDocument
        })
        .catch(
            res.send('404')
            )
}