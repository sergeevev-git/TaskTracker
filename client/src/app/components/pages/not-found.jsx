import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="parent">
            <div className="container-fluid">
                <div className="row ">
                    <div className="col d-flex flex-column coloumn-add-stat"></div>
                    <div className="col d-flex flex-column coloumn-tasks"></div>
                    <div className="col d-flex flex-column coloumn-in-progress"></div>
                    <div className="col d-flex flex-column coloumn-finished"></div>
                    <div className="col-md-4 offset-md-3 shadow d-flex p-3 align-items-center flex-column not-found">
                        <p className="m-0 numbers">404</p>
                        <p className="m-0">page not found</p>
                        <p className="m-2">
                            <Link to="/">home page</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
