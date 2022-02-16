import React from "react";

const UserStatistics = ({ user, index }) => {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{`${user.data.username}/${user.data.email}`}</td>
            <td className="text-center">{user.allTodos.length}</td>
            <td className="text-center">{user.newTodos.length}</td>
            <td className="text-center">{user.inWorkTodos.length}</td>
            <td className="text-center">{user.finishedTodos.length}</td>
        </tr>
    );
};

export default UserStatistics;
