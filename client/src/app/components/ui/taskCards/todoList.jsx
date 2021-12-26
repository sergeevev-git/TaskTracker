import React from "react";
import TodoCard from "./todoCard";

const TodoList = ({ todos }) => {
    return todos.map((todo) => <TodoCard key={todo._id} {...todo} />);
};

export default TodoList;
