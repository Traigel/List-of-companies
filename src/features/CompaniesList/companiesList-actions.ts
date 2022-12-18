import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {companiesAPI, ResponseCompanyType} from '../../api';
import { handleServerNetworkError } from '../../common/utils';
import {setAppStatus} from '../../app/app-reducer';

// Actions
export const setCompanyChecked = createAction<{ companyId: string, checked: boolean }>('companies/setCompanyChecked')

// Thunks
export const getCompanies = createAsyncThunk<ResponseCompanyType[]>(
  'companies/getCompanies', async (_, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
      return await companiesAPI.getCompanies()
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({status: 'idle'}))
    }
  })