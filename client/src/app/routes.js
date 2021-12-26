import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import Login from "./layouts/login";
import Main from "./layouts/main";
import Background from "./components/ui/background.jsx";
import NotFound from "./components/pages/not-found.jsx";

const useRoutes = () => {
    const { isLogin, isLoading } = useAuth();

    if (isLoading) {
        return <Background />;
    }

    if (isLogin) {
        return (
            <Switch>
                {/* <Route path="/404" component={NotFound} /> */}
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Redirect to="/login" />
        </Switch>
    );
};

export default useRoutes;
