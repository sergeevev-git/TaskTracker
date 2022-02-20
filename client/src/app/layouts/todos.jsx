import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Board from "../components/ui/taskCards/board";
import { useDispatch, useSelector } from "react-redux";
import { getBoadrs, newTodo, inWorkTodo, completeTodo } from "../store/todos";
import { getTodosError } from "../store/todos";
import EditTodo from "../components/ui/taskCards/editTodo";

const Todos = () => {
    const dispatch = useDispatch();
    const boards = useSelector(getBoadrs());
    const todosError = useSelector(getTodosError());
    const [currentTodo, setCurrentTodo] = useState(null);

    useEffect(() => {
        if (todosError) {
            toast.error(todosError);
        }
    }, [todosError]);

    const handleDragOver = (e, ref) => {
        e.preventDefault();
        e.target.closest(".col-12").classList.add("opacity");
    };

    const handleDragLeave = (e, board) => {
        e.target.closest(".col-12").classList.remove("opacity");
    };

    const handleDragStart = (e, board, todo) => {
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

    return (
        <main>
            <div className="container-fluid main">
                <div className="row">
                    {boards.map((board, index) => {
                        return (
                            <Board
                                key={index}
                                board={board}
                                currentTodo={currentTodo}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop}
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
