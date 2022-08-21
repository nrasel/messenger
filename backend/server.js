const express = require("express");
const app = express();
const dotenv=require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')


const http=require('http');
const socket=require('socket.io');


const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");
const messengerRoute =require('./routes/messengerRoute')

dotenv.config({
  path: "backend/config/config.env"
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", authRouter);
app.use('/api/messenger',messengerRoute)


app.get("/", (req, res) => {
  res.send({ data: "Different message from server" });
});

databaseConnect();

const server=http.createServer(app);
const io=socket(server);


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

const port =process.env.PORT;

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
