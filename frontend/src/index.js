import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./main.scss";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {positions,transitions,Provider as AlertProvider} from 'react-alert'
import alertTemplate from 'react-alert-template-basic'

const container = document.getElementById("root");
const root = createRoot(container);

const options={
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <AlertProvider template={alertTemplate} {...options}>
      <App />
     </AlertProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
