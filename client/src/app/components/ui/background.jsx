import React from "react";

const background = () => {
    return (
        <div className="container-fluid main">
            <div className="row ">
                <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-add-stat"></div>
                <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-tasks"></div>
                <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-in-progress"></div>
                <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-finished"></div>
            </div>
        </div>
    );
};

export default background;
