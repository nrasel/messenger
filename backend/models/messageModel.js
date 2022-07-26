const {model,Schema}=require('mongoose');

const messageSchmea=new Schema({
    senderId:{
        type : String,
        required: true
    },
    senderName : {
        type: String,
        required: true
    },
    receiveId : {
        type: String,
        required: true
    },
    message : {
       text : {
        type : String,
        default: ''
       },
       image : {
        type : String,
        default: ''
       }
    }
},{timestamps: true})

module.exports = model('message',messageSchmea);