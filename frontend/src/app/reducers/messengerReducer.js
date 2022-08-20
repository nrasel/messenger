import {
  FRIENDS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  UPDATE_FRIEND_MESSAGE,
  MESSAGE_SEND_SUCCESS_CLEAR,
  SEEN_MESSAGE,
  DELIVARED_MESSAGE
} from "../type/messengerType";

const messengerState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === FRIENDS_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }
  if (type === MESSAGE_GET_SUCCESS) {
    return {
      ...state,
      message: payload.message,
    };
  }
  if (type === MESSAGE_SEND_SUCCESS) {
    return {
      ...state,
      messageSendSuccess: true,
      message: [...state.message, payload.message],
    };
  }
  if (type === "SOCKET_MESSAGE") {
    return {
      ...state,
      message: [...state.message, payload.message],
    };
  }

  if (type === UPDATE_FRIEND_MESSAGE) {
    const index = state.friends.findIndex(
      (f) =>
        f.fndInfo._id === payload.msgInfo.receiverId ||
        f.fndInfo._id === payload.msgInfo.senderId
    );
    state.friends[index].msgInfo = payload.msgInfo;
    state.friends[index].msgInfo.status = payload.status;
    return state;
  }

  if (type === MESSAGE_SEND_SUCCESS_CLEAR) {
    return {
      ...state,
      messageSendSuccess: false,
    };
  }

  if(type===SEEN_MESSAGE){
    const index = state.friends.findIndex(
      (f) =>
        f.fndInfo._id === payload.msgInfo.receiverId ||
        f.fndInfo._id === payload.msgInfo.senderId
    );
    state.friends[index].msgInfo.status = "seen"

    return {
      ...state
    }
  }


  if(type===DELIVARED_MESSAGE){
    const index = state.friends.findIndex(
      (f) =>
        f.fndInfo._id === payload.msgInfo.receiverId ||
        f.fndInfo._id === payload.msgInfo.senderId
    );
    state.friends[index].msgInfo.status = "delivared"

    return {
      ...state
    }
  }



  return state;
};
