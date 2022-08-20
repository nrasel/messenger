import axios from "axios";
import {
  FRIENDS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from "../../app/type/messengerType";
export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/messenger/get-friends");
    dispatch({
      type: FRIENDS_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/messenger/send-message", data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/messenger/get-message/${id}`);
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ImageMessageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/messenger/image-message-send",
      data
    );

    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message
      },
    });

    // console.log(response.data)
  } catch (error) {
    console.log(error.response.data);
  }
};


export const seenMessage=(msg)=>async(dispatch)=>{

  try {
    const response = await axios.post('/api/messenger/seen-message',msg)
  } catch (error) {
    console.log(error.response.message)
  }

  // console.log(msg)
}

export const updateMessage=(msg)=>async(dispatch)=>{
  try {
    const response = await axios.post('/api/messenger/delivared-message',msg)
    // console.log(response)
  } catch (error) {
    console.log(error.response.message)
  }
}