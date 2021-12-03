import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
// import NotFound from "./components/pages/not-found.jsx";
// import { useAuth } from "./hooks/useAuth";

const useRoutes = (isLogin) => {
    // const { signIn } = useAuth();
    // console.log("currentUser", currentUser);
    // const isLogin = !!currentUser;
    // console.log("isLogin", isLogin);
    if (isLogin) {
        return (
            <Switch>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
                {/* <Route path="/404" component={NotFound} />
                <Redirect to="/404" /> */}
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            {/* <Route path="/secret" component={Secret } /> */}
            <Redirect to="/login" />
        </Switch>
    );
};

export default useRoutes;
