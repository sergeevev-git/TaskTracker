import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
    name: "errors",
    initialState: {
        entities: null,
        // isErrors: false,
    },
    reducers: {
        errorsSet: (state, action) => {
            state.entities = action.payload;
            // state.isErrors = true;
        },
        errorsCleared: (state) => {
            state.entities = null;
            // state.isErrors = false;
        },
    },
});

const { actions, reducer: errorsReducer } = errorsSlice;

const { errorsSet, errorsCleared } = actions;

export const setErrors = (errors) => (dispatch) => {
    console.log(errors);
    dispatch(errorsSet(errors));
};

export const clearErrors = () => (dispatch) => {
    dispatch(errorsCleared());
};

export const getErrors = () => (state) => state.errors.entities;

// export const getIsErrorsStatus = () => (state) => state.errors.isErrors;

export default errorsReducer;
