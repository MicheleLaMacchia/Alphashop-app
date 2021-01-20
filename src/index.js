import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./resources/css/responsive.css";
import "./resources/css/ui.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
