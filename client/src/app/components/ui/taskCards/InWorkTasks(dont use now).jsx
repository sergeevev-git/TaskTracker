import React from "react";

const InWorkTasks = ({ todos }) => {
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
                            <p>more 2 days ago</p>
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

        // <div className="card mb-1">
        //     <div className="card-header">task name</div>
        //     <div className="card-body">
        //         <p className="card-text">
        //             Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        //             Aut soluta, nam cum maxime iste ut perspiciatis modi
        //             deserunt ab, nostrum autem necessitatibus, saepe sit
        //             similique quibusdam aliquid ea quam eius.
        //         </p>
        //     </div>
        //     <div className="card-footer text-muted d-flex justify-content-end">
        //         <ul className="list-group list-group-horizontal">
        //             <li className="list-group-item">more 2 days</li>
        //             <li className="list-group-item list-group-item-warning">
        //                 <i className="bi bi-exclamation-square"></i>
        //             </li>

        //             <li className="list-group-item list-group-item-dark">
        //                 <i className="bi bi-pencil"></i>
        //             </li>
        //             <li className="list-group-item list-group-item-success">
        //                 <i className="bi bi-check-square"></i>
        //             </li>
        //             <li className="list-group-item list-group-item-danger">
        //                 <i className="bi bi-x-square"></i>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    );
};

export default InWorkTasks;
