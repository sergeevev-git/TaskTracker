import React from "react";

const Statistic = () => {
    return (
        <ul className="list-group list-group-flush statitics ">
            <li className="list-group-item text-white li-statitics ">
                total count
            </li>
            <li className="list-group-item text-white li-statitics ">new</li>
            <li className="list-group-item text-white li-statitics ">
                in progress
            </li>
            <li className="list-group-item text-white li-statitics ">
                finished
            </li>
        </ul>
    );
};

export default Statistic;
