import React from "react";

const InWorkCard = () => {
    return (
        <div className="card mb-1">
            <div className="card-header">task name</div>
            <div className="card-body">
                <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut soluta, nam cum maxime iste ut perspiciatis modi
                    deserunt ab, nostrum autem necessitatibus, saepe sit
                    similique quibusdam aliquid ea quam eius.
                </p>
            </div>
            <div className="card-footer text-muted d-flex justify-content-end">
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item">more 2 days</li>

                    <li className="list-group-item list-group-item-dark">
                        <i className="bi bi-pencil"></i>
                    </li>
                    <li className="list-group-item list-group-item-success">
                        <i className="bi bi-check-square"></i>
                    </li>
                    <li className="list-group-item list-group-item-danger">
                        <i className="bi bi-x-square"></i>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InWorkCard;
