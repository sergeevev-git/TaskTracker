import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import todosService from "../services/todos.service";
import { useAuth } from "./useAuth";

const TodosContext = React.createContext();

export const useTodos = () => {
    return useContext(TodosContext);
};

const TodosProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [todos, setTodos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [enterErrors, setEnterErrors] = useState(null);

    useEffect(() => {
        if (loaded) {
            getTodos();
        }
        setLoaded(false);
    }, [loaded]);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (enterErrors !== null) {
            enterErrors.map((error) => {
                toast.error(error.msg, { theme: "colored" });
            });
            setEnterErrors(null);
        }
    }, [enterErrors]);

    async function getTodos() {
        console.log("123");
        try {
            const { todos } = await todosService.fetchAll(currentUser.id);
            setTodos(todos);
            console.log(todos);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function addTodo({ user, title, description, deadline }) {
        try {
            const { todo } = await todosService.add({
                user,
                title,
                description,
                deadline,
            });
            console.log("addTodo data", todo);
            setLoaded(true);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function importantTodo(id) {
        try {
            const { todo } = await todosService.important(id);
            console.log("importantTodo todo", todo);
            // setTodos([...todos], todo);
            // console.log(todos);
            setLoaded(true);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function completeTodo(id) {
        try {
            const { todo } = await todosService.complete(id);
            console.log("completeTodo todo", todo);
            // setTodos([...todos], todo);
            // console.log(todos);
            setLoaded(true);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function deleteTodo(id) {
        try {
            const { todo } = await todosService.delete(id);
            console.log("deleteTodo todo", todo);
            // setTodos([...todos], todo);
            // console.log(todos);
            setLoaded(true);
        } catch (error) {
            errorCatcher(error);
        }
    }

    // async function getAllUsers() {
    //     try {
    //         const { data } = await httpService.get("auth/users");
    //         console.log("getAllUsers data", data);
    //     } catch (error) {
    //         errorCatcher(error);
    //     }
    // }

    function errorCatcher(error) {
        const { message, errors } = error.response.data;
        setError(message);
        if (errors && errors.length !== 0) setEnterErrors(errors);
    }

    return (
        <TodosContext.Provider
            value={{
                todos,
                addTodo,
                getTodos,
                importantTodo,
                completeTodo,
                deleteTodo,
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};

TodosProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default TodosProvider;
