import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getErrors } from "../../store/errors";

const NotFound = () => {
    const enterErrors = useSelector(getErrors());

    useEffect(() => {
        if (enterErrors) {
            enterErrors.map((error) => toast.error(error.msg));
        }
    }, [enterErrors]);

    return (
        // <div className="parent">
        //     <div className="container-fluid main">
        //         <div className="row ">
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-add-stat"></div>
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-tasks"></div>
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-in-progress"></div>
        //             <div className="col-12 col-md-6 col-lg-3 coloumn-finished"></div>

        <div className="col-md-4 offset-md-4 shadow d-flex p-3 align-items-center flex-column not-found">
            <p className="m-0 numbers">404</p>
            <p className="m-0">page not found</p>
            <p className="m-2">
                <Link to="/">home page</Link>
            </p>
        </div>

        //         </div>
        //     </div>
        // </div>
    );
};

export default NotFound;
