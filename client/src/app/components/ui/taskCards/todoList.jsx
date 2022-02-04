import React from "react";
import TodoCard from "./todoCard";
import Loader from "../../common/loader";

const TodoList = ({ board, ...props }) => {
    // console.log(props);
    return board.tasks.map((todo) => (
        <TodoCard key={todo._id} {...todo} board={board} {...props} />
    ));
};

export default TodoList;
