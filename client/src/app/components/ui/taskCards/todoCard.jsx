import React, { useRef } from "react";
import { useTodos } from "../../../hooks/useTodos";
import PropTypes from "prop-types";

const TodoCard = ({
    _id: id,
    title,
    text,
    deadline,
    status,
    important,
    board,
    ...props
}) => {
    const { importantTodo, inWorkTodo, completeTodo, deleteTodo } = useTodos();
    const {
        onDragOver,
        onDragLeave,
        onDragStart,
        onDragEnd,
        onDrop,
        handleEditTask,
    } = props;
    const ref = useRef(null);

    const checkCondition = (condition) => {
        return condition ? "-fill" : "";
    };

    return (
        <>
            <div
                className={"task-card" + (important ? " important" : "")}
                draggable={true}
                ref={ref}
                onDragLeave={(e) => onDragLeave(e, ref)}
                onDragOver={(e) => onDragOver(e, ref)}
                onDragEnd={(e) => onDragEnd(e, ref)}
                onDragStart={(e) => onDragStart(e, board, id)}
            >
                <div className="task-card-header">
                    <p>{title}</p>
                </div>

                <div className="task-card-text">
                    <p>{text}</p>
                </div>

                <div className="task-card-footer">
                    <p>more 2 days ago</p>
                    <div className="buttons">
                        {status !== "completed" && (
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
                                    onClick={() => importantTodo(id)}
                                ></i>
                                <i
                                    className="bi bi-pencil m-1 text-secondary"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="edit"
                                    role="button"
                                    onClick={() => handleEditTask(id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTaskModal"
                                ></i>
                                <i
                                    className={
                                        "bi bi-collection-play" +
                                        checkCondition(status === "inWork") +
                                        "  m-1 text-info"
                                    }
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="take to work"
                                    role="button"
                                    onClick={() => inWorkTodo(id, false)}
                                ></i>
                            </>
                        )}
                        <i
                            className={
                                "bi bi-check-square" +
                                checkCondition(status === "completed") +
                                " m-1 text-success"
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="complete"
                            role="button"
                            onClick={() => completeTodo(id, false)}
                        ></i>
                        <i
                            className={
                                "bi bi-x-square" +
                                checkCondition(status === "completed") +
                                " m-1 text-dark"
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="delete"
                            role="button"
                            onClick={() => deleteTodo(id)}
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
