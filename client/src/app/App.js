import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import "./App.scss";

import AppLoader from "./components/ui/hoc/appLoader";

import ProtectedRoute from "./components/common/protectedRoute";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import Login from "./layouts/login";
import Todos from "./layouts/todos";
import Main from "./layouts/main";
import LogOut from "./layouts/logout";
import NotFound from "./layouts/404";

const App = () => {
    return (
        <div>
            <AppLoader>
                <Header />

                <Switch>
                    <ProtectedRoute path="/todos" component={Todos} />

                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>

                <Footer />
            </AppLoader>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                transition={Zoom}
                pauseOnFocusLoss={false}
            />
        </div>
    );
};

export default App;
