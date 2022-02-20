import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";

const Main = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return isLoggedIn ? (
        <Redirect to="/todos" />
    ) : (
        <div className="col-md-4 offset-md-4 shadow d-flex p-3 align-items-center flex-column not-found">
            Здесь баннер
        </div>
    );
};

export default Main;
