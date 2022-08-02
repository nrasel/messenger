import React from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { message, currentFriend, scrollRef,typeingMessage } = props;
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="message-show">
        {message && message.length > 0
          ? message.map((m, idx) =>
              m.senderId === myInfo.id ? (
                <div key={idx} ref={scrollRef} className="my-message">
                  <div className="">
                    <div className="image-message">
                      <div className="my-text">
                        <p className="message-text">
                          {m.message.text === "" ? (
                            <img src={`./image/${m.message.image}`} alt="" />
                          ) : (
                            m.message.text
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="time">2 june 2021</div>
                  </div>
                </div>
              ) : (
                <div ref={scrollRef} className="fd-message">
                  <div className="image-message-time">
                    <img src={`./image/${currentFriend.image}`} alt="" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text">
                          {m.message.text === "" ? (
                            <img src={`./image/${m.message.image}`} alt="" />
                          ) : (
                            m.message.text
                          )}
                        </p>
                      </div>
                      <div className="time">5 june 2021</div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
      <div className="typing-msg">
          {typeingMessage && typeingMessage.msg && typeingMessage.senderId === currentFriend._id ?  <div className="fd-message">
          <div className="image-message-time">
            <img src={`./image/${currentFriend.image}`} alt="" />
            <div className="message-time">
              <div className="fd-text">
                <p className="message-text">typing.....</p>
              </div>
            </div>
          </div>
        </div>:''}
      </div>
    </>
  );
};

export default Message;
