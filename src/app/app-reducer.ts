import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCompanies} from '../features/CompaniesList/companiesList-actions';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.fulfilled, (state) => {
        state.isInitialized = true
      })
  }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions

// Types
export type RequestStatusType = 'idle' | 'loading' | 'failed'