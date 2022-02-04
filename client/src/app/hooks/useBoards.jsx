import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useTodos } from "./useTodos";

const BoardsContext = React.createContext();

export const useBoards = () => {
    return useContext(BoardsContext);
};

const BoardsProvider = ({ children }) => {
    const { getTodos, todos } = useTodos();
    const [newTodos, setNewTodos] = useState([]);
    const [inWorkTodos, setInWorkTodos] = useState([]);
    const [finishedTodos, setFinishedTodos] = useState([]);
    const [boards, setBoards] = useState({
        newTodos: [],
        inWorkTodos: [],
        finishedTodos: [],
    });

    useEffect(async () => {
        getBoards();
    }, []);

    useEffect(() => {
        setNewTodos(todos.filter((todo) => todo.status === "new"));
        setInWorkTodos(todos.filter((todo) => todo.status === "inWork"));
        setFinishedTodos(todos.filter((todo) => todo.status === "completed"));
        setBoards((prevState) => ({
            ...prevState,
            newTodos: newTodos,
            inWorkTodos: inWorkTodos,
            finishedTodos: finishedTodos,
        }));
        console.log(boards);
    }, [todos]);

    async function getBoards() {
        try {
            console.log("useBoarrs");
            await getTodos();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BoardsContext.Provider
            value={{
                boards,
                getBoards,
            }}
        >
            {children}
        </BoardsContext.Provider>
    );
};

BoardsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default BoardsProvider;
