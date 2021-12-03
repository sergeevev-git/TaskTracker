import React from "react";

const AddTask = () => {
    return (
        <div className="add-task">
            <form className="mt-1 mb-3">
                <div className="ms-3 me-3">
                    <label
                        htmlFor="taksName"
                        className="form-label text-white mb-0 "
                    >
                        name
                    </label>
                    <input type="text" className="form-control" id="taksName" />
                </div>
                <div className="ms-3 me-3">
                    <label
                        htmlFor="taskDescription"
                        className="form-label text-white mb-0 "
                    >
                        description
                    </label>
                    <textarea
                        className="form-control text-area"
                        id="taskDescription"
                        rows="5"
                        cols="10"
                        maxLength="300"
                    ></textarea>
                </div>

                <div className="row ms-1 me-1 d-flex justify-content-between">
                    <div className="col-auto ">
                        <label
                            htmlFor="taksDeadline"
                            className="form-label text-white mb-0 "
                        >
                            deadline
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="taksDeadline"
                        />
                    </div>
                    <div className="mt-4 col-auto div-btn-add">
                        <button className="btn btn-primary btn-add">
                            add task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
