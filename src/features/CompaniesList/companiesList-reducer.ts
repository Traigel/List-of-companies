import {createSlice} from "@reduxjs/toolkit";
import {
  createCompany,
  getCompanies,
  removeCompanies,
  setCompanyAllChecked,
  setCompanyChecked,
  updateCompany
} from './companiesList-actions';
import {ResponseCompanyType} from '../../api';
import {createEmployee, removeEmployees} from '../EmployeesList/employeesList-actions';

const initialState = {
  companies: [] as CompanyType[],
  activeCompanyId: [] as string[],
  allChecked: false
}

const slice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.companies = action.payload.map(el => ({...el, checked: false}))
      })
      .addCase(setCompanyChecked, (state, action) => {
        state.companies = state.companies.map(el => el.id === action.payload.companyId ? {
          ...el,
          checked: action.payload.checked
        } : el)
        state.activeCompanyId = action.payload.checked
          ? [...state.activeCompanyId, action.payload.companyId]
          : state.activeCompanyId.filter(el => el !== action.payload.companyId)
      })
      .addCase(setCompanyAllChecked, (state, action) => {
        state.companies = state.companies.map(el => ({...el, checked: action.payload.checked}))
        state.allChecked = action.payload.checked
        state.activeCompanyId = action.payload.checked
          ? state.companies.reduce((acc: string[], cur: CompanyType) => [...acc, cur.id], [])
          : []
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.companies = state.companies.map(el => el.id === action.payload.id ? {...el, ...action.payload} : el)
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.companies.unshift({...action.payload, checked: false})
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.companies = state.companies.map(el => el.id === action.payload.parentId
          ? {...el, qtyEmployees: el.qtyEmployees + 1}
          : el)
      })
      .addCase(removeCompanies.fulfilled, (state, action) => {
        state.companies = state.companies.filter(el => !action.payload.includes(el.id))
      })
      .addCase(removeEmployees.fulfilled, (state, action) => {
        state.companies = state.companies.map(el => action.payload.numberRemote[el.id] ? {
          ...el,
          qtyEmployees: el.qtyEmployees - action.payload.numberRemote[el.id]
        } : el)
      })
  }
})

export const companiesReducer = slice.reducer

// Types
export type InitialCompaniesStateType = typeof initialState

export type CompanyType = ResponseCompanyType & {
  checked: boolean
}