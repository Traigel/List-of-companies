import {createAsyncThunk} from '@reduxjs/toolkit';
import {companiesAPI, ResponseCompanyType} from '../../api';
import { handleServerNetworkError } from '../../common/utils';
import {setAppStatus} from '../../app/app-reducer';

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