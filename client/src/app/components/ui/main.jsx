import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";

const Main = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return isLoggedIn ? (
        <Redirect to="/todos" />
    ) : (
        // <div className="parent">
        //     <div className="container-fluid main">
        //         <div className="row ">
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-add-stat"></div>
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-tasks"></div>
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-in-progress"></div>
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-finished"></div>
        <div className="col-md-4 offset-md-4 shadow d-flex p-3 align-items-center flex-column not-found">
            Здесь баннер
        </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Main;
