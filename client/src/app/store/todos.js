о какimport { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        entities: [           
            {
                
                title: "new tasks",
                tasks: [],
            },
            {
                
                title: "in progress",
                tasks: [],
            },
            {
                
                title: "finished",
                tasks: [],
            },
        ],           
        isLoading: true,
        error: null,
        enterError: null,
    },
    redicers: {
        todosRequested: (state) => {
            state.isLoading = true;
        },
        todosRecieved: (state, action) => {
            // здесь раскидываем по доскам
            // ****
            //
            state.entities = action.payload;
            state.isLoading = false;
        },
        todosRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        todoAdded(state, action) {
            state.entities.push(action.payload);
        },
    },
});

const { reducer: todosReducer, actions } = todosSlice;
const { todosRequested, todosRecieved, todosRequestFailed, todoAdded } = actions;

const addTodoRequested = createAction("todos/addTodoRequested");
const addTodoFailed = createAction("todos/addTodoFailed");

export const loadTodosList = (userId) => async (dispatch) => {
    dispatch(todosRequested());
    try {
        const { content } = await todosService.fetchAll(userId);
        dispatch(todosRecieved(content));
    } catch (error) {
        dispatch(todosRequestFailed(error.message));
    }
};

export const addTodo = (payload) => async (dispatch) => {
    dispatch(addTodoRequested());
    try {
        const { todo } = await todosService.add(payload);
        console.log("addTodo data", todo);
        dispatch(todoAdded(todo));
    } catch (error) {
        dispatch(addTodoFailed(error.message));
    }
};

export default todosReducer;
