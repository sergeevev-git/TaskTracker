import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.scss";

import ProtectedRoute from "./components/common/protectedRoute";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import Login from "./layouts/login";
import Todos from "./layouts/todos";
import Main from "./layouts/main";
import LogOut from "./layouts/logout";

import AuthProvider from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { loadTodosList } from "./store/todos";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTodosList("61aae4a46d441b545b7e1878"));
    }, []);

    return (
        <div>
            <AuthProvider>
                <Header />

                <Switch>
                    <ProtectedRoute path="/todos" component={Todos} />

                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>

                {/* <TodosProvider>{routes}</TodosProvider> */}

                <Footer />
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
