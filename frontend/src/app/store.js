import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { messengerReducer } from "./reducers/messengerReducer";

let reducers = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
});
const middleware = [thunkMiddleware];
export const store = createStore(reducers,compose(
  applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
