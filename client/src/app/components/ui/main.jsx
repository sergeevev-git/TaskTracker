import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";
import Carousel from "./carousel";

const Main = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return isLoggedIn ? (
        <Redirect to="/todos" />
    ) : (
        <div className="col-md-8 offset-md-2 shadow d-flex p-3 align-items-center flex-column slider">
            <Carousel />
        </div>
    );
};

export default Main;
