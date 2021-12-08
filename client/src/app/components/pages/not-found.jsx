import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="parent">
            <div className="d-flex p-5 align-items-center flex-column not-found">
                <p className="m-0 numbers">404</p>
                <p className="m-0">page not found</p>
                <p className="m-2">
                    <Link to="/">home page</Link>
                </p>
            </div>
        </div>
    );
};

export default NotFound;
