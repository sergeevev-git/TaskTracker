import React from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "./hoc/collapse";

const UserStatisticsDetails = ({ todos }) => {
    return (
        <tr>
            <td className="text-center"></td>
            <td className="text-center">all</td>
            <td className="text-center">new</td>
            <td className="text-center">work</td>
            <td className="text-center">finish</td>
        </tr>
    );
};

UserStatisticsDetails.propTypes = {
    todos: PropTypes.array,
};

export default UserStatisticsDetails;
