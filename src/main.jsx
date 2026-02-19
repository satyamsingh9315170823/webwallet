import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Buffer } from "buffer";
import process from "process";
import { BrowserRouter } from "react-router-dom";

window.Buffer = Buffer;
window.process = process;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
    <App />
  </BrowserRouter>
   
  </React.StrictMode>
);
