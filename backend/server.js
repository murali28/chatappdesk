/******************************************************************************
 *  Execution       : default node          : cmd> node server.js (or) npm run dev
 *                      
 * 
 *  Purpose         : chatting with two peoples
 * 
 *  @description    
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @module         : server its an optional explicitly npm or local package
 *  @author         : murali s  <muralismmr94@gmail.com>
 *  @version        : 1.0
 *  @since          : 23-03-2019
 *
 ******************************************************************************/
const http = require('http');

// to include all modules or all files
//which allows us to support HTTp protocol and socket.IO
const express = require('express');
//create a express app
const app = express();
//importing the cors 
const cors = require('cors');
// usage of cors is to connect the express/middleware .
app.use(cors());
/*body-parser parses your request and converts it into a 
format from which you can easily extract relevant information that you may need.*/
const bodyParser = require('body-parser');

/*Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
and exposes the resulting object (containing the keys and values) on req.body.*/
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

const expressValidator = require('express-validator');
app.use(expressValidator());


//importing socketIO to get connection between client and server.
const mongoose = require('mongoose');
const route = require('../backend/routes/route');

app.use('/', route); // calling router
app.use(express.static('frontend'));

mongoose.Promise = global.Promise;
//importing the mongodb configuration file.
const dbConfig = require('./config/configurl');

const port = "4000";
var server = app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

const io = require('socket.io')(server);
var chatController= require('./controllers/chatController');
io.on('connection', function(socket){
    console.log("socket connected");
    socket.on("createMessage", function(message){
        chatController.message(message,(err,data)=>{
            if(err){
                console.log("error occured "+err);            
            }
            else{
                console.log("no error in chat controller, new messsage send");
                io.emit("new message chat controller "+data);
            }
        })
    })
    socket.on('disconnect',function(){
        console.log("connection socket disconncected");     
    })
})

//connection to the mongo database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("successfully connected to database");
}).catch(err => {
    console.log("error to connect the database");
    process.exit();
});


