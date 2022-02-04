import React from "react";
import PropTypes from "prop-types";

const Statistic = ({ statistic }) => {
    return (
        <ul className="list-group list-group-flush statitics ">
            <li className="list-group-item text-white li-statitics ">
                <div className="d-flex justify-content-between">
                    <div>total tasks</div>
                    <div>{statistic[0] || 0}</div>
                </div>
            </li>
            <li className="list-group-item text-white li-statitics ">
                <div className="d-flex justify-content-between">
                    <div>new</div>
                    <div>{statistic[1] || 0}</div>
                </div>
            </li>
            <li className="list-group-item text-white li-statitics ">
                <div className="d-flex justify-content-between">
                    <div>in progress</div>
                    <div>{statistic[2] || 0}</div>
                </div>
            </li>
            <li className="list-group-item text-white li-statitics ">
                <div className="d-flex justify-content-between">
                    <div>finished</div>
                    <div>{statistic[3] || 0}</div>
                </div>
            </li>
        </ul>
    );
};

Statistic.propTypes = {
    total: PropTypes.number,
    recent: PropTypes.number,
    inWork: PropTypes.number,
    finished: PropTypes.number,
};

export default Statistic;
