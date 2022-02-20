import React from "react";
import PropTypes from "prop-types";

const UserTaskTitle = ({ taskTitle }) => {
    return (
        <div className="statistics-card">
            <p>{taskTitle}</p>
        </div>
    );
};

UserTaskTitle.propTypes = {
    taskTitle: PropTypes.string,
};

export default UserTaskTitle;
