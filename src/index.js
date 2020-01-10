import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "applocation/json";

axios.interceptors.request.use(
  request => {
    console.log(request);
    return request;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
