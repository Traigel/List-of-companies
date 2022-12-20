import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "../../api/serverData";
import {setAppError, setAppStatus } from "../../app/app-reducer";

export const handleServerNetworkError = (e: any, dispatch: Dispatch) => {
  const err = e as AxiosError<ErrorType>
  dispatch(setAppError({message: 'Ошибка сервера'}))
  dispatch(setAppStatus({status: 'failed'}))
}

// Types
type ErrorType = {
  message: string;
}