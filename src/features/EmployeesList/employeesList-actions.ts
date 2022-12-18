import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {employeesAPI, RequestUpdateEmployeeType, ResponseEmployeeType} from '../../api';
import { setAppStatus } from '../../app/app-reducer';
import { handleServerNetworkError } from '../../common/utils';

// Actions
export const setEmployeesChecked = createAction<{ employeeId: string, checked: boolean }>('employees/setEmployeesChecked')

export const setEmployeeAllChecked = createAction<{ checked: boolean }>('employees/setEmployeeAllChecked')

// Thunks
export const getEmployees = createAsyncThunk<{ companyId: string, employees: ResponseEmployeeType[] }, { companyId: string }>(
  'employees/getEmployees', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      const res = await employeesAPI.getEmployees({companyId: param.companyId})
      return {companyId: param.companyId, employees: res}
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })

export const updateEmployees = createAsyncThunk< ResponseEmployeeType & {companyId: string}, RequestUpdateEmployeeType>(
  'employees/updateEmployees', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      const res = await employeesAPI.updateEmployee(param)
      return {...res, companyId: param.companyId}
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })