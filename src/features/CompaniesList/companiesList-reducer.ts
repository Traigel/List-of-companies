import {createSlice} from "@reduxjs/toolkit";
import {getCompanies, setCompanyAllChecked, setCompanyChecked, updateCompany} from './companiesList-actions';
import {ResponseCompanyType} from '../../api';

const initialState = {
  companies: [] as CompaniesType[],
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
          ? state.companies.reduce((acc: string[], cur: CompaniesType) => [...acc, cur.id], [])
          : []
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.companies = state.companies.map(el => el.id === action.payload.id ? {...el, ...action.payload} : el)
      })
  }
})

export const companiesReducer = slice.reducer

// Types
export type CompaniesType = ResponseCompanyType & {
  checked: boolean
}