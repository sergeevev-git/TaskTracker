import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./app/hooks/useAuth";
import App from "./app/App";
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ToastContainer />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
