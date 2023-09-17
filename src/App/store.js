import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "../Features/username/usernameSlice";
import transactionReducer from "../Features/username/transactionSlice";

export const store = configureStore({
    reducer: {
        username: usernameReducer,
        transaction: transactionReducer
    }
})