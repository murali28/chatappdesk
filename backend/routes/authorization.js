var express = require('express');

var router = express.Router();
var auth = require('../authantication');
var control = require('../controllers/controller');
var chatController = require("../controllers/chatController");


try{
    router.get('/getAllUser',auth,control.getAllUser);
    router.get('/getUserMsg',auth,chatController.getUserMsg);
    
}
catch(err)
{
    console.log("err found while receving token - authorization.js");
}

module.exports =router