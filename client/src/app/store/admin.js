import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import userService from "../services/user.service";
import history from "../utils/history";
import { clearErrors, setErrors } from "./errors";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: null,
        todos: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        allUsersRequested: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        allUsersRequestSuccess: (state, action) => {
            state.users = action.payload;
        },
        allUsersRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        allTodosRequested: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        allTodosRequestSuccess: (state, action) => {
            state.todos = action.payload;
            state.isLoading = false;
        },
        allTodosRequestFailed: (state, action) => {
            state.error = action.payload;
        },
    },
});

const { reducer: adminReducer, actions } = adminSlice;
const {
    allUsersRequested,
    allUsersRequestSuccess,
    allUsersRequestFailed,
    allTodosRequested,
    allTodosRequestSuccess,
    allTodosRequestFailed,
} = actions;

export const loadAllUsersList = (userId) => async (dispatch) => {
    dispatch(allUsersRequested());
    dispatch(clearErrors());
    try {
        const users = await userService.getAllUsers(userId);
        dispatch(allUsersRequestSuccess(users));
    } catch (error) {
        const { errors, message } = error.response.data;
        if (errors) {
            dispatch(setErrors(errors));
            dispatch(allUsersRequestFailed(message));
        } else {
            dispatch(allUsersRequestFailed(error.message));
        }
        console.log("allUsersRequestFailed error");
        history.push("/404");
    }
};

export const loadAllTodosList = (userId) => async (dispatch) => {
    dispatch(allTodosRequested());
    dispatch(clearErrors());
    try {
        const todos = await todosService.fetchAllforAll(userId);
        dispatch(allTodosRequestSuccess(todos));
    } catch (error) {
        const { errors, message } = error.response.data;
        if (errors) {
            dispatch(setErrors(errors));
        } else if (message) {
            dispatch(allTodosRequestFailed(message));
        } else {
            dispatch(allTodosRequestFailed(error.message));
        }
        history.push("/404");
    }
};

export const getAllTodos = () => (state) => state.admin.todos;
export const getAllUsers = () => (state) => state.admin.users;
export const getAllDataLoadingStatus = () => (state) => state.admin.isLoading;

export default adminReducer;
