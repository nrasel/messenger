import React, { useEffect,useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import {useDispatch, useSelector} from 'react-redux'
import { getFriends,messageSend,getMessage,ImageMessageSend } from "../features/actions/messengerAction";
import { useState } from "react";

function Messenger() {

  const scrollRef=useRef();

  const {friends,message}=useSelector(state=>state.messenger);
  const {myInfo}=useSelector(state=>state.auth)
 
  const [currentFriend,setCurrentFriend]=useState('');
  const [newMessage,setNewMessage]=useState('');
  const inputHandle=(e)=>{
    setNewMessage(e.target.value);
  }
  // console.log(message)

  const sendMessages=(e)=>{
    e.preventDefault();
    const data={
      senderName : myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage?newMessage:'👍'
    }
    dispatch(messageSend(data))
  
  }

  const emojiSend=(emo)=>{
    setNewMessage(`${newMessage}`+emo)
  }

  const imageSend=(e)=>{
    console.log(e.target.files)
    if(e.target.files.length !== 0){
      const imageName=e.target.files[0].name
      const newImageName = Date.now() + imageName

      const formData=new FormData()
      formData.append('senderName',myInfo.userName);
      formData.append('imageName',newImageName)
      formData.append('receiverId',currentFriend._id);
      formData.append('image',e.target.files[0])

      dispatch(ImageMessageSend(formData))
      
    }
  }

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getFriends())
  },[])

  useEffect(()=>{
    if(friends && friends.length>0){
      setCurrentFriend(friends[0]);
    }
  },[friends])

  useEffect(()=>{
    dispatch(getMessage(currentFriend._id))
  },[currentFriend?._id])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:'smooth'})
  },[message])

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./image/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <BiSearch />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              <ActiveFriend />
            </div>
            <div className="friends">
              {
                friends && friends.length > 0 ? friends.map((fd,idx)=>
                  <div key={idx} onClick={()=>setCurrentFriend(fd)} className={currentFriend._id === fd._id? 'hover-friend active': 'hover-friend'}>
                <Friends friend={fd} />
              </div>
                ):'no friends'
              }
              
            </div>
          </div>
        </div>
        {
          currentFriend ? <RightSide 
          currentFriend={currentFriend} inputHandle={inputHandle} newMessage={newMessage} sendMessages={sendMessages} message={message} scrollRef={scrollRef} emojiSend={emojiSend} imageSend={imageSend} />:'Please Select your friend'
        }
      </div>
    </div>
  );
}

export default Messenger;
