import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Board from "../components/ui/taskCards/board";
import { useDispatch, useSelector } from "react-redux";
import {
    getTodos,
    getBoadrs,
    newTodo,
    inWorkTodo,
    completeTodo,
} from "../store/todos";
import { getTodosError } from "../store/todos";
import EditTodo from "../components/ui/taskCards/editTodo";

const Todos = () => {
    const dispatch = useDispatch();
    const boards = useSelector(getBoadrs());
    const todos = useSelector(getTodos());
    const todosError = useSelector(getTodosError());

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentTodo, setCurrentTodo] = useState(null);
    // const [statistic, setStatistic] = useState([]);
    // const [editableTodo, setEditableTodo] = useState({});

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

    const handleDragStart = (e, board, todo) => {
        // setCurrentBoard(board);
        setCurrentTodo(todo);
    };

    const handleDragEnd = (e, board) => {
        e.target.closest(".col-12").classList.remove("opacity");
    };

    const handleDrop = (e, board, todo) => {
        e.preventDefault();

        e.target.closest(".col-12").classList.remove("opacity");

        console.log("drop board", board);
        console.log("drop task", todo);

        board.title === "in progress"
            ? dispatch(inWorkTodo(todo, true))
            : board.title === "finished"
            ? dispatch(completeTodo(todo, true))
            : dispatch(newTodo(todo));
    };

    // const handleEditTodo = (id) => {
    //     const [todo] = todos.filter((todo) => todo._id === id);
    //     console.log(todo);
    //     setEditableTodo(todo);
    // };

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
                <div className="row">
                    {boards.map((board) => {
                        return (
                            <Board
                                key={board.id}
                                board={board}
                                // statistic={statistic}
                                currentTodo={currentTodo}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop}
                                // handleEditTodo={handleEditTodo}
                            />
                        );
                    })}
                </div>
                <EditTodo />
            </div>
        </main>
    );
};

export default Todos;
