import todosReducer from "./todos";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    todos: todosReducer,
    // users: usersReduces,
    // errors: errorsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
