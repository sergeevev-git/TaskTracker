import React from "react";
import "react-toastify/dist/ReactToastify.css";
import TodosProvider from "./hooks/useTodos";

import "./App.scss";

import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import Login from "./layouts/login";
import Todos from "./layouts/todos";
import Main from "./layouts/main";
import LogOut from "./layouts/logout";

import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import { Redirect, Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <Header />
                <TodosProvider>
                    <Switch>
                        <ProtectedRoute path="/todos" component={Todos} />

                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>

                    {/* <TodosProvider>{routes}</TodosProvider> */}
                </TodosProvider>
                <Footer />
            </AuthProvider>
        </div>
    );
};

export default App;
