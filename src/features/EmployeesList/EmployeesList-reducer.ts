import {createSlice} from "@reduxjs/toolkit";
import {ResponseEmployeeType} from '../../api';
import {getEmployees} from './employeesList-actions';
import {getCompanies} from '../CompaniesList/companiesList-actions';

const initialState = {
  allEmployees: {} as AllEmployeesType,
}

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.fulfilled, (state, action) => {
        action.payload.forEach((el => {
          state.allEmployees[el.id] = {
            employees: [],
            allChecked: false
          }
        }))
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.allEmployees[action.payload.companyId].employees = action.payload.employees.map(el => ({
          ...el,
          checked: false
        }))
      })
  }
})

export const employeesReducer = slice.reducer

// Types
export type AllEmployeesType = {
  [companyId: string]: EmployeesType
}

export type EmployeesType = {
  employees: EmployeeType[]
  allChecked: boolean
}

export type EmployeeType = ResponseEmployeeType & {
  checked: boolean
}