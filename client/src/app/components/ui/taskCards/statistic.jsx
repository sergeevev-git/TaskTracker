import React from "react";

const Statistic = () => {
    return (
        <div>
            <h4 className="ms-3 mt-4 mb-0">statitics</h4>
            <hr />
            <ul className="list-group list-group-flush statitics ">
                <li className="list-group-item text-white li-statitics ">
                    total count
                </li>
                <li className="list-group-item text-white li-statitics ">
                    new
                </li>
                <li className="list-group-item text-white li-statitics ">
                    in progress
                </li>
                <li className="list-group-item text-white li-statitics ">
                    finished
                </li>
            </ul>
        </div>
    );
};

export default Statistic;
