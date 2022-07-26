import { FRIENDS_GET_SUCCESS,MESSAGE_GET_SUCCESS } from "../type/messengerType";


const messengerState={
    friends:[],
    message:[]
}

export const messengerReducer=(state=messengerState,action)=>{
    const {type,payload}=action;

    if(type===FRIENDS_GET_SUCCESS){
        return {
            ...state,
            friends: payload.friends
        }
    }
    if(type===MESSAGE_GET_SUCCESS){
        return{
            ...state,
            message: payload.message
        }
    }

    return state;
}