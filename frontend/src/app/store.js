import {
  configureStore,
  compose,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";

import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { messengerReducer } from "./reducers/messengerReducer";


let reducers = combineReducers({
  auth: authReducer,
  messenger:messengerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
  { reducer: reducers },
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
