import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { BiMessageAltEdit } from "react-icons/bi";
import { AiFillGift } from "react-icons/ai";
// import { MdSend } from 'react-icons/md';


const MessegeSend = ({inputHandle,newMessage,sendMessages}) => {
  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    " 😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    " 🤫",
    " 🤥",
    "😶",
    " 😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",

    // Gestures and Body Parts
    // 👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃 🫀 🫁 🧠 🦷 🦴 👀 👁 👅 👄 💋 🩸
  ];
  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <BsPlusCircle />
      </div>
      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <input type="file" id="pic" className="form-control" />
        <label htmlFor="pic">
          <RiGalleryLine />
        </label>
      </div>
      <div className="file">
        <BiMessageAltEdit />
      </div>
      <div className="file hover-gift">
        <div className="add-gift">Add Gift</div>
        <AiFillGift />
      </div>
      <div className="message-type">
        <input
          onChange={inputHandle}
          value={newMessage}
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control"
        />
        <label htmlFor="emoji">&#128515;</label>
      </div>
      <div onClick={sendMessages} className="file">👍</div>
      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e,index) => (
            <span key={index}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessegeSend;
