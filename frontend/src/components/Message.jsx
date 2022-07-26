import React from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { message } = props;
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <div className="message-show">
      {
        message && message.length > 0
         ? message.map((m,idx) => 
            m.senderId === myInfo.id ? (
              <div key={idx} className="my-message">
                <div className="">
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">{m.message.text}</p>
                    </div>
                  </div>
                  <div className="time">2 june 2021</div>
                </div>
              </div>
            ) : (
              <div className="fd-message">
                <div className="image-message-time">
                  <img src="./image/8973download.jfif" alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">{m.message.text}</p>
                    </div>
                    <div className="time">5 june 2021</div>
                  </div>
                </div>
              </div>
            )
          )
        : ""
        }
    </div>
  );
};

export default Message;
