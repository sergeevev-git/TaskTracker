import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Board from "../components/ui/taskCards/board";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, getBoadrs, newTodo, inWorkTodo, completeTodo } from "../store/todos";
import { getTodosError } from "../store/todos";

const Todos = () => {
    const dispatch = useDispatch();
    const boards = useSelector(getBoadrs());
    const todos = useSelector(getTodos());
    const todosError = useSelector(getTodosError());

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [statistic, setStatistic] = useState([]);
    const [editableTask, setEditableTask] = useState({});

    useEffect(() => {
        console.log(todosError);
        if (todosError) {
            toast.error(todosError);
        }
    }, [todosError]);

    // useEffect(() => {
    //     getTodos();
    // }, []);

    // useEffect(() => {
    //     setBoadrs((prevState) => [
    //         ...prevState,
    //         (boards[1].tasks = todos.filter((todo) => todo.status === "new")),
    //         (boards[2].tasks = todos.filter((todo) => todo.status === "inWork")),
    //         (boards[3].tasks = todos.filter((todo) => todo.status === "completed")),
    //     ]);
    //     setStatistic((prevState) => [
    //         ...prevState,
    //         (statistic[0] = todos.length),
    //         (statistic[1] = boards[1].tasks.length),
    //         (statistic[2] = boards[2].tasks.length),
    //         (statistic[3] = boards[3].tasks.length),
    //     ]);

    //     // setNewTodos(todos.filter((todo) => todo.status === "new"));
    //     // setInWorkTodos(todos.filter((todo) => todo.status === "inWork"));
    //     // setFinishedTodos(todos.filter((todo) => todo.status === "completed"));
    // }, [todos]);

    const handleDragOver = (e, ref) => {
        e.preventDefault();
        e.target.closest(".col-12").classList.add("opacity");
    };

    const handleDragLeave = (e, board) => {
        e.target.closest(".col-12").classList.remove("opacity");
    };

    const handleDragStart = (e, board, task) => {
        // setCurrentBoard(board);
        setCurrentTask(task);
    };

    const handleDragEnd = (e, board) => {
        e.target.closest(".col-12").classList.remove("opacity");
    };

    const handleDrop = (e, board, task) => {
        e.preventDefault();

        e.target.closest(".col-12").classList.remove("opacity");

        console.log("drop board", board);
        console.log("drop task", task);

        board.title === "in progress"
            ? dispatch(inWorkTodo(task, true))
            : board.title === "finished"
            ? dispatch(completeTodo(task, true))
            : dispatch(newTodo(task));
    };

    const handleEditTask = (id) => {
        const [task] = todos.filter((todo) => todo._id === id);
        setEditableTask(task);
    };

    // async function getAllUsers() {
    //     try {
    //         const { data } = await httpService.get("users/allUsers");

    //         setUsers(data.users);
    //         console.log(users);
    //     } catch (error) {
    //         errorCatcher(error);
    //         console.log(error.response);
    //     }
    // }

    // function errorCatcher(error) {
    //     const { message } = error.response.data;
    //     setError(message);
    // }

    return (
        <main>
            <div className="container-fluid main">
                <div className="row ">
                    {boards.map((board) => {
                        return (
                            <Board
                                key={board.id}
                                board={board}
                                statistic={statistic}
                                currentTask={currentTask}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop}
                                handleEditTask={handleEditTask}
                            />
                        );
                    })}
                </div>
            </div>

            <div
                className="modal fade"
                id="editTaskModal"
                tabIndex="-1"
                aria-labelledby="editTaskModal"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editTaskModal">
                                {editableTask.title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">{editableTask.text}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Todos;
