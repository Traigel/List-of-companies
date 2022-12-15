import React from 'react';
import styles from './App.module.scss'
import {useAppDispatch, useAppSelector} from '../common/hooks';
import { getCompanies } from '../features/CompaniesList/companiesList-actions';

export const App = () => {

  const dispatch = useAppDispatch()

  const companies = useAppSelector(state => state.companies.companies)

  const onClickHandler = () => {
    dispatch(getCompanies())
  }

  return (
    <div className={styles.app}>
      <button onClick={onClickHandler}>aasdqwe</button>
    </div>
  );
}
