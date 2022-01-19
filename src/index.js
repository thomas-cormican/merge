import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
