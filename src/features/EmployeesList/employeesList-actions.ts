import {createAsyncThunk} from '@reduxjs/toolkit';
import {employeesAPI, ResponseEmployeeType} from '../../api';
import { setAppStatus } from '../../app/app-reducer';
import { handleServerNetworkError } from '../../common/utils';

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