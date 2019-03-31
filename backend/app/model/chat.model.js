var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var chatSchema = new mongoSchema({
       senderUserId: {
type:String

    },
    senderName: {
        type:String

    },
        
    reciverUserId: {
        
        type:String

    },
    reciverName: {
        type:String

    },
    message:{

        type:String

    }

}, {
        timestamps: true
    });

function chatModel() {

}
var chat = mongoose.model('chatInfo', chatSchema);

    chatModel.prototype.addMessage = (chatData, callback) => {
        console.log('chatData model', chatData.senderUserId)

        const newMsg = new chat({
            senderUserId: chatData.senderUserId,
            senderName: chatData.senderName,
            reciverUserId: chatData.reciverUserId,
            reciverName: chatData.reciverName,
            message: chatData.message
        });
        console.log("new Message in model ",newMsg);
        
        newMsg.save((err, result) => {


            if (err) {
                console.log("Storing data failed , error occured on saving",err);
                return callback(err);
            } else {
                console.log("Chat data saved sucessfully");
                return callback(null,result);
            }
        });
    }


    chatModel.prototype.getUserMsg = (req ,callback) => {
        chat.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data);
            }

        })
    }


module.exports = new chatModel();
