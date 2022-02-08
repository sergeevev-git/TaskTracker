import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import history from "../utils/history";
import { clearErrors, setErrors } from "./errors";
import { loadCurrentUserData } from "./user";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        // entities: [
        //     { title: "add task", tasks: null },
        //     { title: "new tasks", tasks: null },
        //     { title: "in progress", tasks: null },
        //     { title: "finished", tasks: null },
        // ],
        // entities: {
        //     add: { title: "add task", tasks: null },
        //     new: { title: "new tasks", tasks: null },
        //     inwork: { title: "in progress", tasks: null },
        //     finished: { title: "finished", tasks: null },
        // },
        entities: null,
        boards: [
            { title: "add task", tasks: null },
            { title: "new tasks", tasks: null },
            { title: "in progress", tasks: null },
            { title: "finished", tasks: null },
        ],
        isLoading: false,
        error: null,
    },
    reducers: {
        todosRequested: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        todosRecieved: (state, action) => {
            state.entities = action.payload;
        },
        updateBoardsSuccess: (state) => {
            state.boards[1].tasks = state.entities.filter(
                (todo) => todo.status === "new"
            );
            state.boards[2].tasks = state.entities.filter(
                (todo) => todo.status === "inWork"
            );
            state.boards[3].tasks = state.entities.filter(
                (todo) => todo.status === "completed"
            );
            state.isLoading = false;
        },
        todosRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addTodoSuccess(state, action) {
            state.entities.push(action.payload);
        },
        addTodoFailed: (state, action) => {
            state.error = action.payload;
        },
        updateTodoRequested(state) {
            state.error = null;
        },
        updateTodoSuccess(state, action) {
            const elementIndex = state.entities.findIndex(
                (todo) => todo._id === action.payload._id
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            };
        },
        updateTodoFailed: (state, action) => {
            state.error = action.payload;
        },
        deleteTodoRequested(state) {
            state.error = null;
        },
        deleteTodoSuccess(state, action) {
            state.entities = state.entities.filter((todo) => todo._id !== action.payload);
        },
        deleteTodoFailed: (state, action) => {
            state.error = action.payload;
        },
        todosCleared(state) {
            state.entities = null;
            state.boards = [
                { title: "add task", tasks: null },
                { title: "new tasks", tasks: null },
                { title: "in progress", tasks: null },
                { title: "finished", tasks: null },
            ];
        },
    },
});

const { reducer: todosReducer, actions } = todosSlice;
const {
    todosRequested,
    todosRecieved,
    updateBoardsSuccess,
    todosRequestFailed,
    addTodoSuccess,
    addTodoFailed,
    updateTodoRequested,
    updateTodoSuccess,
    updateTodoFailed,
    deleteTodoRequested,
    deleteTodoSuccess,
    deleteTodoFailed,
    todosCleared,
} = actions;

const addTodoRequested = createAction("todos/addTodoRequested");
// const addTodoFailed = createAction("todos/addTodoFailed");

export const loadTodosList = (userId) => async (dispatch) => {
    dispatch(todosRequested());
    try {
        const { todos } = await todosService.fetchAll(userId);
        dispatch(todosRecieved(todos));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { status, statusText } = error.response;
        if (status === 404) {
            history.push("/404");
            dispatch(todosRequestFailed(statusText));
        } else dispatch(todosRequestFailed(error.message));
    } finally {
        dispatch(loadCurrentUserData());
    }
};

export const addTodo = (payload) => async (dispatch) => {
    dispatch(addTodoRequested());
    dispatch(clearErrors());
    try {
        const { todo } = await todosService.add(payload);
        console.log("addTodo data", todo);
        dispatch(addTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { errors, message } = error.response.data;
        if (errors) {
            dispatch(setErrors(errors));
            dispatch(addTodoFailed(message));
        } else dispatch(addTodoFailed(error.message));
    }
};

export const importantTodo = (todoId) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.important(todoId);
        console.log("importantTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const editTodo = (payload) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.edit(payload);
        console.log("editTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const newTodo = (todoId) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.new(todoId);
        console.log("newTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const inWorkTodo = (todoId, drop) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.inWork(todoId, drop);
        console.log("inWorkTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const completeTodo = (todoId, drop) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.complete(todoId, drop);
        console.log("completeTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const deleteTodo = (todoId) => async (dispatch) => {
    dispatch(deleteTodoRequested());
    try {
        const { todo } = await todosService.delete(todoId);
        console.log("deleteTodo data", todo);
        dispatch(deleteTodoSuccess(todoId));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(deleteTodoFailed(statusText));
        } else {
            dispatch(deleteTodoFailed(error.message));
        }
    }
};

export const clearTodosStore = () => (dispatch) => {
    dispatch(todosCleared());
};

export const getTodos = () => (state) => state.todos.entities;
export const getBoadrs = () => (state) => state.todos.boards;
export const getTodosLoadingStatus = () => (state) => state.todos.isLoading;
export const getTodosError = () => (state) => state.todos.error;

export default todosReducer;
