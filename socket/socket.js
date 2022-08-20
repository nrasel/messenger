
const io =require('socket.io')(8000,{
    cors : {
        origin : '*',
        methods : ['GET','POST']
    }
})

let users=[];

const addUser = (userId,socketId,userInfo)=>{

    const checkUser = users.some(u=>u.userId === userId)
    if(!checkUser){
        users.push({userId,socketId,userInfo})
    }
}


const userRemove=(socketId)=>{
    users = users.filter(u=>u.socketId !== socketId)
}

// frind friend
const findFriend=(id)=>{
    return users.find(u=>u.userId===id)
}

const userLogout=(userId)=>{
    users=users.filter(u=>u.userId !== userId)
}

io.on('connection',(socket)=>{
    console.log('user is connected....')
    // get user info from frontend
    socket.on('addUser',(userId,userInfo)=>{
        addUser(userId,socket.id,userInfo);
        io.emit('getUser',users)
        const us=users.filter(u=>u.userId !== userId);
        const con ='new_user_add'
        for(var i=0;i<us.length;i++){
            socket.to(us[i].socketId).emit('new_user_add',con)
        }
    })

    // get message from frontend
    socket.on('sendMessage',(data)=>{
        
        const user = findFriend(data.receiverId)
        // console.log(data)
        if(user !==undefined){
            socket.to(user.socketId).emit('getMessage',data)
        }
    })

    socket.on('messageSeen',msg=>{
        const user = findFriend(msg.senderId)
        if(user !==undefined){
            socket.to(user.socketId).emit('msgSeenResponse',msg)
        }
    })

    socket.on('delivatedMessage',msg=>{
        const user = findFriend(msg.senderId)
        if(user !==undefined){
            socket.to(user.socketId).emit('msgDelivaredResponse',msg)
        }
    })

    socket.on('seen',data=>{
        const user = findFriend(data.senderId)
        if(user !==undefined){
            socket.to(user.socketId).emit('seenSuccess',data)
        }
    })

    // get typing msg
    socket.on('typeingMessage',(data)=>{
        const user = findFriend(data.receiverId)
        if(user !==undefined){
            socket.to(user.socketId).emit('typeingMessage',{
                senderId : data.senderId,
                receiverId : data.receiverId,
                msg : data.msg
            })
        }
    })

    socket.on('logout',userId=>{
        userLogout(userId)
    })

    // connection to frontend
    socket.on('disconnect',()=>{
        console.log('user disconnect....')
        userRemove(socket.id);
        io.emit('getUser',users);
    })
})