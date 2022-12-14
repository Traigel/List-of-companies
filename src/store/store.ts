import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { companiesReducer } from "../features/CompaniesList";

const rootReducer = combineReducers({
  companies: companiesReducer
})

export const store = configureStore({reducer: rootReducer})

// Types
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch