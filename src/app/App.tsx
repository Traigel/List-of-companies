import React from 'react';
import styles from './App.module.scss'
import {CompaniesList} from '../features/CompaniesList/CompaniesList';
import {EmployeesList} from '../features/EmployeesList/EmployeesList';

export const App = () => {

  return (
    <div className={styles.app}>
      <CompaniesList/>
      <EmployeesList/>
    </div>
  );
}
