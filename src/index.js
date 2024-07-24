// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Launch from "./components/Launch";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const Main = () => {
  const location = useLocation();
  return location.search.includes("code") ? <App /> : <Launch />;
};

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

