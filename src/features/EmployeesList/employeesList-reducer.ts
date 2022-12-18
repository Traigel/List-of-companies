import {createSlice} from "@reduxjs/toolkit";
import {ResponseEmployeeType} from '../../api';
import {getEmployees, setEmployeeAllChecked, setEmployeesChecked, updateEmployees} from './employeesList-actions';

const initialState = {
  employees: [] as EmployeeType[],
  allChecked: false,
}

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.employees = [...state.employees, ...action.payload.employees.map(el => ({
          ...el,
          parentId: action.payload.companyId,
          checked: false
        }))]
      })
      .addCase(setEmployeesChecked, (state, action) => {
        state.employees = state.employees.map(el => el.id === action.payload.employeeId ? {
          ...el,
          checked: action.payload.checked
        } : el)
      })
      .addCase(setEmployeeAllChecked, (state, action) => {
        state.employees = state.employees.map(el => ({...el, checked: action.payload.checked}))
        state.allChecked = action.payload.checked
      })
      .addCase(updateEmployees.fulfilled, (state, action) => {
        state.employees = state.employees.map(el => el.parentId === action.payload.companyId && el.id === action.payload.id
          ? {...el, ...action.payload}
          : el
        )
      })
  }
})

export const employeesReducer = slice.reducer

// Types
export type EmployeeType = ResponseEmployeeType & {
  parentId: string
  checked: boolean
}