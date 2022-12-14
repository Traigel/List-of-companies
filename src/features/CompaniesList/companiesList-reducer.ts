import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'companies',
  initialState: [] as CompaniesType[],
  reducers: {}
})

export const companiesReducer = slice.reducer

// Types
export type CompaniesType = {
  id: string
  title: string
  qtyEmployees: number
  address: string
}