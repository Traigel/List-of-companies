import {appReducer, InitialAppStateType, setAppError, setAppStatus} from './app-reducer';
import {getCompanies} from '../features/CompaniesList/companiesList-actions';

let state: InitialAppStateType
const responseCompany = {
  id: '123',
  title: 'IT',
  qtyEmployees: 10,
  address: 'street'
}
beforeEach(() => {
  state = {
    status: 'idle',
    error: {message: ''},
    isInitialized: false
  }
})

test('set app status', () => {
  const appReducerTest = appReducer(state, setAppStatus({status: 'loading'}))
  expect(appReducerTest.status).toBe('loading')
})

test('set app error', () => {
  const appReducerTest = appReducer(state, setAppError({message: 'Error text'}))
  expect(appReducerTest.error.message).toBe('Error text')
})

test('set app isInitialized', () => {
  const action = getCompanies.fulfilled([responseCompany, responseCompany], 'requestId')
  const appReducerTest = appReducer(state, action)
  expect(appReducerTest.isInitialized).toBe(true)
})