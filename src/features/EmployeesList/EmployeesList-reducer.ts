import {createSlice} from "@reduxjs/toolkit";
import {ResponseEmployeeType} from '../../api';
import {getEmployees} from './employeesList-actions';
import {setCompanyChecked} from '../CompaniesList/companiesList-actions';

const initialState = {
  employees: [] as EmployeeType[],
  allChecked: false,
  activeParentsId: [] as string[],
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
      .addCase(setCompanyChecked, (state, action) => {
        state.activeParentsId = action.payload.checked
          ? [...state.activeParentsId, action.payload.companyId]
          : state.activeParentsId.filter(el => el !== action.payload.companyId)
      })
  }
})

export const employeesReducer = slice.reducer

// Types
export type EmployeeType = ResponseEmployeeType & {
  parentId: string
  checked: boolean
}