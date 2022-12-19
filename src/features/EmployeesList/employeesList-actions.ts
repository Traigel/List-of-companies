import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  employeesAPI,
  RequestCreateEmployeeType,
  RequestUpdateEmployeeType,
  ResponseCompanyEmployeeType,
  ResponseEmployeeType
} from '../../api';
import {setAppStatus} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../common/utils';
import {AppRootStateType} from '../../store/store';

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

export const updateEmployees = createAsyncThunk<ResponseCompanyEmployeeType, RequestUpdateEmployeeType>(
  'employees/updateEmployees', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      return await employeesAPI.updateEmployee(param)
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })

export const createEmployee = createAsyncThunk<ResponseCompanyEmployeeType, RequestCreateEmployeeType>(
  'employees/createEmployee', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      return await employeesAPI.createEmployee(param)
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })

export const removeEmployees = createAsyncThunk<{ employeesId: string[], companiesId: string[], numberRemote: { [companyId: string]: number } }, void>(
  'employees/removeEmployees', async (_, {dispatch, rejectWithValue, getState}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const state = getState() as AppRootStateType
    const activeCompanyId = state.companies.activeCompanyId
    const activeEmployeesId = state.employees.activeEmployeesId
    const numberRemote = activeCompanyId.reduce((acc: { [companyId: string]: number }, cur) => {
      acc[cur] = state.employees.employees.filter(el => el.parentId === cur && activeCompanyId.includes(el.parentId)).filter(el => el.checked).length
      return acc
    }, {})
    try {
      const res = await employeesAPI.removeEmployees({employeesId: activeEmployeesId})
      return {companiesId: activeCompanyId, employeesId: activeEmployeesId, numberRemote}
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })