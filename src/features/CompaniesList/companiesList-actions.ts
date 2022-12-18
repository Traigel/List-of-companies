import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {companiesAPI, RequestUpdateCompanyType, ResponseCompanyType} from '../../api';
import { handleServerNetworkError } from '../../common/utils';
import {setAppStatus} from '../../app/app-reducer';
import {getEmployees} from '../EmployeesList/employeesList-actions';

// Actions
export const setCompanyChecked = createAction<{ companyId: string, checked: boolean }>('companies/setCompanyChecked')

export const setCompanyAllChecked = createAction<{ checked: boolean }>('companies/setCompanyAllChecked')

// Thunks
export const getCompanies = createAsyncThunk<ResponseCompanyType[]>(
  'companies/getCompanies', async (_, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      const arr = await companiesAPI.getCompanies()
      arr.forEach(el => dispatch(getEmployees({companyId: el.id})))
      return arr
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })

export const updateCompany = createAsyncThunk< ResponseCompanyType, RequestUpdateCompanyType>(
  'companies/updateCompany', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      return await companiesAPI.updateCompany(param)
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })
