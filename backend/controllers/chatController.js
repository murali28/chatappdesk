const chatServices = require("../services/chatServices");

module.exports.message = (req, callback) => {
    console.log("request", req);
    chatServices.addMessage(req, (err, data) => {
        if (err) {
            console.log("error in controller");
            callback(err);
        } else {
            console.log("controller is working fine");
            callback(null, data);
        }
    })
}


module.exports.getUserMsg = (req, res) => {
    console.log("Entered control");
    chatServices.getUserMsg(req, (err, data) => {
        var responce = {};
        if (err) {
            data.responce = false;
            data.responce = err;
            res.status(500).send(responce)
        } else {
            data.responce = true;
            data.responce = data;
            res.status(200).send(responce)
        }
    })
}
