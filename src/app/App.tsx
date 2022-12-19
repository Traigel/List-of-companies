import React from 'react';
import styles from './App.module.scss'
import {CompaniesList} from '../features/CompaniesList/CompaniesList';
import {EmployeesList} from '../features/EmployeesList/EmployeesList';
import {useAppSelector} from '../common/hooks';
import {LinearProgress} from '../common/components/LinearProgress/LinearProgress';
import { Preloader } from '../common/components/Preloader/Preloader';
import {ErrorOutput} from '../common/components/ErrorOutput/ErrorOutput';

export const App = () => {

  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  return (
    <main className={styles.app}>
      {!isInitialized && <Preloader/>}
      {status === 'loading' && <LinearProgress/>}
      <CompaniesList/>
      <EmployeesList/>
      <ErrorOutput/>
    </main>
  );
}
