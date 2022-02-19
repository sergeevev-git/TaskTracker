import React from "react";
import PropTypes from "prop-types";
import UserStatistics from "./userStatistics";

const StatisticsTable = ({ statistics }) => {
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {/* <th scope="col"></th> */}
                        <th scope="col">name/email</th>
                        <th scope="col">all todos</th>
                        <th scope="col">new </th>
                        <th scope="col">in work</th>
                        <th scope="col">finished</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.length > 0 &&
                        statistics.map((user, index) => {
                            return (
                                <>
                                    <UserStatistics
                                        key={index}
                                        user={user}
                                        index={index}
                                    />
                                </>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};

StatisticsTable.propTypes = {
    statistics: PropTypes.array,
};

export default StatisticsTable;
