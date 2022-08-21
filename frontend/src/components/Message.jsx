import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { HiOutlineCheckCircle } from "react-icons/hi";

const Message = (props) => {
  const { message, currentFriend, scrollRef, typeingMessage } = props;
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, idx) =>
            m.senderId === myInfo.id ? (
              <div key={idx} ref={scrollRef} className="my-message">
                <div className="">
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text my">
                        {m.message.text === "" ? (
                          <img src={m.message.image} alt="" />
                        ) : (
                          m.message.text
                        )}
                      </p>
                      {idx === message.length - 1 &&
                      m.senderId === myInfo.id ? (
                        m.status === "seen" ? (
                          <img
                            className="img"
                            src={currentFriend.image}
                            alt=""
                          />
                        ) : m.status === "delivared" ? (
                          <span>
                            <RiCheckboxCircleFill />
                          </span>
                        ) : (
                          <span>
                            <HiOutlineCheckCircle />
                          </span>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="time">
                    {moment(m.createdAt).startOf("mini").fromNow()}
                  </div>
                </div>
              </div>
            ) : (
              <div key={idx} ref={scrollRef} className="fd-message">
                <div className="image-message-time">
                  <img src={currentFriend.image} alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text fd">
                        {m.message.text === "" ? (
                          <img src={m.message.image} alt="" />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                    <div className="time">
                      {moment(m.createdAt).startOf("mini").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={currentFriend.image} alt="" />
            <h3>{currentFriend.userName} connect you</h3>
            <span>
              {moment(currentFriend.createdAt).startOf("mini").fromNow()}
            </span>
          </div>
        )}
      </div>
      <div className="typing-msg">
        {typeingMessage &&
        typeingMessage.msg &&
        typeingMessage.senderId === currentFriend._id ? (
          <div className="fd-message">
            <div className="image-message-time">
              <img src={currentFriend.image} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="message-text">typing.....</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Message;
