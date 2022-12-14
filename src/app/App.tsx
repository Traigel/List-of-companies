import React from 'react';
import styles from './App.module.scss'
import {companiesAPI, employeesAPI} from '../api';
import {companyId1} from '../api/data';

export const App = () => {

  const onClickHandler = async () => {
    // const qwe = await companiesAPI.getCompanies()
    const qwe = await employeesAPI.getEmployees({companyId: companyId1})
    console.log(qwe)
  }

  return (
    <div className={styles.app}>
      <button onClick={onClickHandler}>qwe</button>
    </div>
  );
}
