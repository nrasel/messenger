const User=require('../models/authModels')
const messageModel=require('../models/messageModel')
module.exports.getFriends=async(req,res)=>{
    const myId=req.myId
    try {
        const friendGet=await User.find({})
        const filter=friendGet.filter(d=>(d.id !== myId));
        
        res.status(200).json({success:true,friends:filter})
    } catch (error) {
        res.status(500).json({error:{errorMessage:'Internal server error'}})
    }
}

module.exports.messageUploadDB=async(req,res)=>{
    const {senderName,receiverId,message}=req.body
    console.log(req.body);
    const senderId=req.myId;
    console.log(senderId)

    try {
        const insertMessage = await messageModel.create({
            senderId : senderId,
            senderName: senderName,
            receiveId : receiverId,
            message : {
                text : message,
                image: ''
            }
        })
        res.status(201).json({
            success: true,
            message : {
            senderId : senderId,
            senderName: senderName,
            receiveId : receiverId,
            message : {
                text : message,
                image : ''
            }
            }
        })
    } catch (error) {
        res.status(500).json({error:{errorMessage:'Internal server error'}})
    }
}


module.exports.messageGet=async(req,res)=>{
    const myId=req.myId
    const fdId=req.params.id
    
    try {
        let getAllMessage = await messageModel.find({})
        getAllMessage = getAllMessage.filter(m=>m.senderId === myId && m.receiveId===fdId || m.receiveId === myId && m.senderId == fdId)
        res.status(200).json({success: true, message:getAllMessage})
    } catch (error) {
        res.status(500).json({error:{errorMessage:'Internal server error'}})
    }
}