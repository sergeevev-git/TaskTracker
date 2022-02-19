import React from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "./hoc/collapse";
import UserStatisticsDetails from "./userStatisticsDetails";

const UserStatistics = ({ user, index }) => {
    console.log(user);
    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                {/* <td>
                    {
                        <CollapseWrapper>
                            <UserStatisticsDetails todos={user.allTodos} />
                        </CollapseWrapper>
                    }
                </td> */}
                <td>{`${user.data.username}/${user.data.email}`}</td>
                <td className="text-center">{user.allTodos.length}</td>
                <td className="text-center">{user.newTodos.length}</td>
                <td className="text-center">{user.inWorkTodos.length}</td>
                <td className="text-center">{user.finishedTodos.length}</td>
            </tr>

            {/* <CollapseWrapper>
                <UserStatisticsDetails todos={user.allTodos} />
            </CollapseWrapper> */}
        </>
    );
};

UserStatistics.propTypes = {
    user: PropTypes.object,
    index: PropTypes.number,
};

export default UserStatistics;
