import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { companiesReducer } from "../features/CompaniesList/companiesList-reducer";
import {employeesReducer} from '../features/EmployeesList/EmployeesList-reducer';
import {appReducer} from '../app/app-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  companies: companiesReducer,
  employees: employeesReducer
})

export const store = configureStore({reducer: rootReducer})

// Types
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch