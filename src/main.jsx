import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./useContext/LoadingProvider.jsx";
import { AuthUser } from "./useContext/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthUser>
          <App />
        </AuthUser>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
