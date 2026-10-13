import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        //todo: add more slices/reducers here for posts functionalaties
    },
});

export default store;