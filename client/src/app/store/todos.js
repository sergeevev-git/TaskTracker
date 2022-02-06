import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";

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
        isLoading: true,
        // error: null,
        // enterError: null,
    },
    reducers: {
        todosRequested: (state) => {
            state.isLoading = true;
        },
        todosRecieved: (state, action) => {
            console.log(action.payload);
            state.entities = action.payload;
            state.isLoading = false;
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
        },
        todosRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addTodoSuccess(state, action) {
            state.entities.push(action.payload);
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
        deleteTodoSuccess(state, action) {
            state.entities = state.entities.filter((todo) => todo._id !== action.payload);
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
    updateTodoSuccess,
    deleteTodoSuccess,
} = actions;

const addTodoRequested = createAction("todos/addTodoRequested");
const addTodoFailed = createAction("todos/addTodoFailed");

const updateTodoRequested = createAction("todos/updateTodoRequested");
const updateTodoFailed = createAction("todos/updateTodoFailed");

const deleteTodoRequested = createAction("todos/deleteTodoRequested");
const deleteTodoFailed = createAction("todos/deleteTodoFailed");

export const loadTodosList = (userId) => async (dispatch) => {
    dispatch(todosRequested());
    try {
        const { todos } = await todosService.fetchAll(userId);
        dispatch(todosRecieved(todos));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        dispatch(todosRequestFailed(error.message));
    }
};

export const addTodo = (payload) => async (dispatch) => {
    dispatch(addTodoRequested());
    try {
        const { todo } = await todosService.add(payload);
        console.log("addTodo data", todo);
        dispatch(addTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        dispatch(addTodoFailed(error.message));
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
        dispatch(updateTodoFailed(error.message));
    }
};

export const editTodo = (todoId) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.edit(todoId);
        console.log("editTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        dispatch(updateTodoFailed(error.message));
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
        dispatch(updateTodoFailed(error.message));
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
        dispatch(updateTodoFailed(error.message));
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
        dispatch(updateTodoFailed(error.message));
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
        dispatch(deleteTodoFailed(error.message));
    }
};

export const getTodos = () => (state) => state.todos.entities;
export const getBoadrs = () => (state) => state.todos.boards;

export default todosReducer;
