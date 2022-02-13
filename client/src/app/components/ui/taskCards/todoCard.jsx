import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import deadlineConvert from "../../../utils/deadlineConvert";
import {
    importantTodo,
    inWorkTodo,
    completeTodo,
    deleteTodo,
    setEditTodoId,
} from "../../../store/todos";

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
    const dispatch = useDispatch();
    const { onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop } = props;
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
                    <div className="deadline">{deadlineConvert.toDateText(deadline)}</div>
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
                                    onClick={() => dispatch(importantTodo(id))}
                                ></i>
                                <i
                                    className="bi bi-pencil m-1 text-secondary"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="edit"
                                    role="button"
                                    onClick={() => dispatch(setEditTodoId(id))}
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTodoModal"
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
                                    onClick={() => dispatch(inWorkTodo(id, false))}
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
                            onClick={() => dispatch(completeTodo(id, false))}
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
                            onClick={() => dispatch(deleteTodo(id))}
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
    deadline: PropTypes.number,
    inwork: PropTypes.bool,
    important: PropTypes.bool,
    completed: PropTypes.bool,
};

export default TodoCard;
