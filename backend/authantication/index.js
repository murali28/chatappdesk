var jwt = require('jsonwebtoken');
var secret = "adcdefgh";
var auth = function (req, res, next) {
    console.log("In authantication");
    var token = req.headers["token"];
    console.log(token, "token is in auth");
    var response = {
        'message': "Unauthorised user"
    };
    jwt.verify(token, secret, function (err, decodedData) {
        if (err) {
            console.log(err)
            return res.status(401).send(response);
        }
        else {
            console.log(decodedData);
            next();
        }
    });
}
module.exports = auth;