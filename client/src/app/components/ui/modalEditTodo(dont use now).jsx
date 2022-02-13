import React from "react";
import PropTypes from "prop-types";
import EditTodo from "./taskCards/editTodo";

const ModalEditTodo = () => {
    return <EditTodo />;
    // <div
    //     className="modal fade"
    //     id="editTaskModal"
    //     tabIndex="-1"
    //     aria-labelledby="editTaskModal"
    //     aria-hidden="true"
    // >
    //     <div className="modal-dialog">
    //         <div className="modal-content">
    {
        /* <EditTodo />; */
    }
    //             {/* <div className="modal-header">
    //                 <h5 className="modal-title" id="editTaskModal">
    //                     {/* {todo.title} */}
    //                 </h5>
    //                 <button
    //                     type="button"
    //                     className="btn-close"
    //                     data-bs-dismiss="modal"
    //                     aria-label="Close"
    //                 ></button>
    //             </div>
    //             <div className="modal-body">{/* {todo.text} */}</div>
    //             <div className="modal-footer">
    //                 <button
    //                     type="button"
    //                     className="btn btn-secondary btn-add"
    //                     data-bs-dismiss="modal"
    //                 >
    //                     close
    //                 </button>
    //                 <button type="button" className="btn btn-primary btn-add">
    //                     save
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // </div> */}
};

ModalEditTodo.propTypes = {
    task: PropTypes.object,
};

export default ModalEditTodo;
