import React from "react";

const NewTask = ({ todos }) => {
    return (
        <>
            {todos.map((todo) => {
                return (
                    <div className="task-card" key={todo.id}>
                        <div className="task-card-header">
                            <p>{todo.title}</p>
                        </div>

                        <div className="task-card-text">
                            <p>{todo.text}</p>
                        </div>

                        <div className="task-card-footer">
                            <p>more 2 days</p>
                            <div className="buttons">
                                <i
                                    className="bi bi-exclamation-square m-1 text-danger"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="important"
                                ></i>
                                <i
                                    className="bi bi-pencil m-1 text-secondary"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="edit"
                                ></i>
                                <i
                                    className="bi bi-check-square m-1 text-success"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="complete"
                                ></i>
                                <i
                                    className="bi bi-x-square m-1 text-dark"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="delete"
                                ></i>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default NewTask;
