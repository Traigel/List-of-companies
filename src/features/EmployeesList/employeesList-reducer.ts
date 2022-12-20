import {createSlice} from "@reduxjs/toolkit";
import {ResponseEmployeeType} from '../../api';
import {
  createEmployee,
  getEmployees,
  removeEmployees,
  setEmployeeAllChecked,
  setEmployeesChecked,
  updateEmployees
} from './employeesList-actions';
import {removeCompanies} from '../CompaniesList/companiesList-actions';

const initialState = {
  employees: [] as EmployeeType[],
  activeEmployeesId: [] as string[],
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
        state.activeEmployeesId = action.payload.checked
          ? [...state.activeEmployeesId, action.payload.employeeId]
          : state.activeEmployeesId.filter(el => el !== action.payload.employeeId)
      })
      .addCase(setEmployeeAllChecked, (state, action) => {
        state.employees = state.employees.map(el => action.payload.activeCompanyId.includes(el.parentId) ? {
          ...el,
          checked: action.payload.checked
        } : el)
        state.allChecked = action.payload.checked
        state.activeEmployeesId = action.payload.checked
          ? state.employees.reduce((acc: string[], cur: EmployeeType) => [...acc, cur.id], [])
          : []
      })
      .addCase(updateEmployees.fulfilled, (state, action) => {
        state.employees = state.employees.map(el => el.parentId === action.payload.parentId && el.id === action.payload.id
          ? {...el, ...action.payload}
          : el
        )
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.unshift({...action.payload, checked: false})
      })
      .addCase(removeCompanies.fulfilled, (state, action) => {
        state.employees = state.employees.filter(el => !action.payload.includes(el.parentId))
      })
      .addCase(removeEmployees.fulfilled, (state, action) => {
        state.employees = state.employees.filter(el => !(action.payload.companiesId.includes(el.parentId) && action.payload.employeesId.includes(el.id)))
      })
  }
})

export const employeesReducer = slice.reducer

// Types
export type EmployeeType = ResponseEmployeeType & {
  parentId: string
  checked: boolean
}