import React, { useState, useEffect } from "react";
import FinishedCard from "../components/ui/taskCards/finishedTasks";
import InWorkCard from "../components/ui/taskCards/InWorkTasks";
import NewTask from "../components/ui/taskCards/newTask";
import AddTask from "../components/ui/taskCards/addTask";
import Statistic from "../components/ui/taskCards/statistic";
import { useTodos } from "../hooks/useTodos";

import TodoList from "../components/ui/taskCards/todoList";
import Board from "../components/ui/taskCards/board";

const Todos = () => {
    const { getTodos, todos } = useTodos();
    // const [newTodos, setNewTodos] = useState([]);
    // const [inWorkTodos, setInWorkTodos] = useState([]);
    // const [finishedTodos, setFinishedTodos] = useState([]);
    const { newTodo, inWorkTodo, completeTodo } = useTodos();
    const [boards, setBoadrs] = useState([
        {
            id: 0,
            title: "add task",
            tasks: [],
        },
        {
            id: 1,
            title: "new tasks",
            tasks: [],
        },
        {
            id: 2,
            title: "in progress",
            tasks: [],
        },
        {
            id: 3,
            title: "finished",
            tasks: [],
        },
    ]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [statistic, setStatistic] = useState([]);
    const [editableTask, setEditableTask] = useState({});

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        setBoadrs((prevState) => [
            ...prevState,
            (boards[1].tasks = todos.filter((todo) => todo.status === "new")),
            (boards[2].tasks = todos.filter((todo) => todo.status === "inWork")),
            (boards[3].tasks = todos.filter((todo) => todo.status === "completed")),
        ]);
        setStatistic((prevState) => [
            ...prevState,
            (statistic[0] = todos.length),
            (statistic[1] = boards[1].tasks.length),
            (statistic[2] = boards[2].tasks.length),
            (statistic[3] = boards[3].tasks.length),
        ]);

        // setNewTodos(todos.filter((todo) => todo.status === "new"));
        // setInWorkTodos(todos.filter((todo) => todo.status === "inWork"));
        // setFinishedTodos(todos.filter((todo) => todo.status === "completed"));
    }, [todos]);

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
            ? inWorkTodo(task, true)
            : board.title === "finished"
            ? completeTodo(task, true)
            : newTodo(task);
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
                    {/* <div className="col-12 col-md-6 col-lg-3 coloumn-add-stat">
                        <div className="coloumn-header ">
                            <h4>add task</h4>
                        </div>
                        <hr />
                        <AddTask />
                        <div className="coloumn-header header-statitics">
                            <h4>{boards[0].title}</h4>
                        </div>
                        <hr />
                        <Statistic
                            total={todos.length}
                            new={boards[1].tasks.length}
                            inWork={boards[2].tasks.length}
                            finished={boards[3].tasks.length}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-tasks">
                        <div className="coloumn-header ">
                            <h4>{boards[1].title}</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            <TodoList
                                todos={boards[1].tasks}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-in-progress">
                        <div className="coloumn-header">
                            <h4>{boards[2].title}</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            <TodoList
                                todos={boards[2].tasks}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-finished">
                        <div className="coloumn-header">
                            <h4>{boards[3].title}</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            <TodoList
                                todos={boards[3].tasks}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop}
                            />
                        </div>
                    </div> */}
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
