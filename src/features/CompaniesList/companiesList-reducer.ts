import {createSlice} from "@reduxjs/toolkit";
import {getCompanies} from './companiesList-actions';
import {ResponseCompanyType} from '../../api';

const initialState = {
  companies: [] as CompaniesType[],
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
  }
})

export const companiesReducer = slice.reducer

// Types
export type CompaniesType = ResponseCompanyType & {
  checked: boolean
}