import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRoutes from "./routes";
import AuthProvider, { useAuth } from "./hooks/useAuth";

import { Route, Switch, Redirect } from "react-router-dom";

import "./App.scss";

import Login from "./layouts/login";
import Main from "./layouts/main";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import NotFound from "./components/pages/not-found.jsx";

const App = () => {
    // const routes = useRoutes(isLogin);

    return (
        <div>
            <AuthProvider>
                <Header />

                {/* {routes} */}
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login" exact component={Login} />

                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>

                <Footer />
            </AuthProvider>

            <ToastContainer />
        </div>
    );
};

export default App;
