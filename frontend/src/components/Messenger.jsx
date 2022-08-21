import React, { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  getFriends,
  messageSend,
  getMessage,
  ImageMessageSend,
  seenMessage,
  updateMessage,
  getTheme,
  themeSet,
} from "../features/actions/messengerAction";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { userLogout } from "../features/actions/authAction";

function Messenger() {
  const dispatch = useDispatch();
  const { friends, message, messageSendSuccess, message_get_success,themeMood,new_user_add } =
    useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  // console.log(myInfo.id)

  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setSocketMessage] = useState("");
  const [typeingMessage, setTypingMessage] = useState("");

  // for socket
  const [activeUser, setActiveUser] = useState([]);

  const scrollRef = useRef();

  // for socket
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });
    socket.current.on("typeingMessage", (data) => {
      setTypingMessage(data);
    });
    socket.current.on("msgSeenResponse", (msg) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("msgDelivaredResponse", (msg) => {
      dispatch({
        type: "DELIVARED_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });
    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });
  }, []);

  // send data to socket
  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo.id);
      setActiveUser(filterUser);
    });
    socket.current.on('new_user_add',data=>{
      dispatch({
        type:'NEW_USER_ADD',
        payload: {
          new_user_add: data
        }
      })
    })
  }, []);

  // check socket msg
  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });

        dispatch(seenMessage(socketMessage));
        socket.current.emit("messageSeen", socketMessage);
        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            msgInfo: socketMessage,
            status: "seen",
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);

    socket.current.emit("typeingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      msg: e.target.value,
    });
  };

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend._id &&
      socketMessage.receiverId === myInfo.id
    ) {
      toast.success(`${socketMessage.senderName} send a new message`);
      dispatch(updateMessage(socketMessage));
      socket.current.emit("delivatedMessage", socketMessage);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: socketMessage,
          status: "delivared",
        },
      });
    }
  }, [socketMessage]);

  const sendMessages = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "❤️",
    };

    socket.current.emit("typeingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      msg: "",
    });
    dispatch(messageSend(data));

    setNewMessage("");
  };

  const emojiSend = (emo) => {
    setNewMessage(`${newMessage}` + emo);
    socket.current.emit("typeingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      msg: emo,
    });
  };

  const imageSend = (e) => {
    if (e.target.files.length !== 0) {
     

      // socket.current.emit("sendMessage", {
      //   senderId: myInfo.id,
      //   senderName: myInfo.userName,
      //   receiverId: currentFriend._id,
      //   time: new Date(),
      //   message: {
      //     text: "",
      //     image: newImageName,
      //   },
      // });

      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);

      dispatch(ImageMessageSend(formData));
    }
  };

  useEffect(() => {
    if (messageSendSuccess) {
      socket.current.emit("sendMessage", message[message.length - 1]);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: message[message.length - 1],
        },
      });
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
  }, [messageSendSuccess]);

  useEffect(() => {
    dispatch(getFriends());
    dispatch({
      type:'NEW_USER_ADD_CLEAR'
    })
  }, [new_user_add]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0].fndInfo);
    }
  }, [friends]);

  useEffect(() => {
    dispatch(getMessage(currentFriend._id));
  }, [currentFriend?._id]);

  useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== myInfo.id &&
        message[message.length - 1].status !== "seen"
      ) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: currentFriend._id,
          },
        });
        socket.current.emit("seen", {
          senderId: currentFriend._id,
          receiverId: myInfo.id,
        });
        dispatch(seenMessage({ _id: message[message.length - 1]._id }));
      }
    }
    dispatch({
      type: "MESSAGE_GET_SUCCESS_CLEAR",
    });
  }, [message_get_success]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  const [hide, setHide] = useState(true);

  const logout = () => {
    dispatch(userLogout());
    socket.current.emit("logout", myInfo.id);
  };

  useEffect(() => {
    dispatch(getTheme());
  },[]);

  const search=(e)=>{
    const getFriendClass = document.getElementsByClassName('hover-friend');
    const friendNameclass=document.getElementsByClassName('Fd_name')
   
    for(var i=0;i<getFriendClass.length,i<friendNameclass.length;i++){
      let text = friendNameclass[i].innerText.toLowerCase();
      if(text.indexOf(e.target.value.toLowerCase())>-1){
        getFriendClass[i].style.display='';
      }
      else{
        getFriendClass[i].style.display='none';
      }
    }

  }

  return (
    <div className={themeMood === 'dark'?'messenger theme':'messenger'}>
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={myInfo.image} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
                </div>
              </div>
              <div className="icons">
                <div onClick={() => setHide(!hide)} className="icon">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
                <div className={hide ? "theme_logout" : "theme_logout show"}>
                  <h3>Dark Mode</h3>
                  <div className="on">
                    <label htmlFor="dark">ON</label>
                    <input onChange={(e)=>dispatch(themeSet(e.target.value))} value="dark" type="radio" name="theme" id="dark" />
                  </div>

                  <div className="of">
                    <label htmlFor="white">OF</label>
                    <input onChange={(e)=>dispatch(themeSet(e.target.value))} value="white" type="radio" name="theme" id="white" />
                  </div>
                  <div onClick={logout} className="logout">
                    <TbLogout />
                    Logout
                  </div>
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <BiSearch />
                </button>
                <input
                onChange={search}
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            {/* <div className="active-friends">
              {activeUser && activeUser.length > 0
                ? activeUser.map((u, idx) => (
                    <ActiveFriend
                      key={idx}
                      user={u}
                      setCurrentFriend={setCurrentFriend}
                    />
                  ))
                : ""}
            </div> */}
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentFriend(fd.fndInfo)}
                      className={
                        currentFriend._id === fd.fndInfo._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                    >
                      <Friends
                        activeUser={activeUser}
                        myId={myInfo.id}
                        friend={fd}
                      />
                    </div>
                  ))
                : "no friends"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessages={sendMessages}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            imageSend={imageSend}
            activeUser={activeUser}
            typeingMessage={typeingMessage}
          />
        ) : (
          "Please Select your friend"
        )}
      </div>
    </div>
  );
}

export default Messenger;
