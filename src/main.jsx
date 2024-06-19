import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { firebaseConfig } from "./components/firebase/firebase";
import app from "./components/firebase/firebase";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
