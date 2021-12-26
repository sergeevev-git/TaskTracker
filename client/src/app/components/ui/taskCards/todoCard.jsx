import React from "react";
import { useTodos } from "../../../hooks/useTodos";
import PropTypes from "prop-types";

const TodoCard = ({
    _id: id,
    title,
    text,
    deadline,
    inwork,
    important,
    completed,
}) => {
    const { importantTodo, completeTodo, deleteTodo } = useTodos();

    const handleImportantTodo = async () => {
        return await importantTodo(id);
    };

    const handleCompleteTodo = async () => {
        return await completeTodo(id);
    };

    const handleDeleteTodo = async () => {
        return await deleteTodo(id);
    };

    const checkCondition = (condition) => {
        return condition ? "-fill" : "";
    };

    return (
        <>
            <div className="task-card">
                <div className="task-card-header">
                    <p>{title}</p>
                </div>

                <div className="task-card-text">
                    <p>{text}</p>
                </div>

                <div className="task-card-footer">
                    <p>more 2 days ago</p>
                    <div className="buttons">
                        {!completed && (
                            <>
                                <i
                                    className={
                                        "bi bi-exclamation-square" +
                                        checkCondition(important) +
                                        " m-1 text-danger"
                                    }
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="important"
                                    role="button"
                                    onClick={handleImportantTodo}
                                ></i>
                                <i
                                    className="bi bi-pencil m-1 text-secondary"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="edit"
                                ></i>
                            </>
                        )}
                        <i
                            className={
                                "bi bi-check-square" +
                                checkCondition(completed) +
                                " m-1 text-success"
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="complete"
                            role="button"
                            onClick={handleCompleteTodo}
                        ></i>
                        <i
                            className={
                                "bi bi-x-square" +
                                checkCondition(completed) +
                                " m-1 text-dark"
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="delete"
                            role="button"
                            onClick={handleDeleteTodo}
                        ></i>
                    </div>
                </div>
            </div>
        </>
    );
};

TodoCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    deadline: PropTypes.string,
    inwork: PropTypes.bool,
    important: PropTypes.bool,
    completed: PropTypes.bool,
};

export default TodoCard;
