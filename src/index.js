import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";
import { requestInterceptor } from "./services/requestInterceptor";
import { responseInterceptor } from "./services/responseInterceptor";

requestInterceptor();
responseInterceptor(); 
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

// serviceWorker.unregister();