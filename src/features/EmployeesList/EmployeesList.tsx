import React, {ChangeEvent} from 'react';
import styles from './EmployeesList.module.scss';
import {useAppSelector} from '../../common/hooks';

export const EmployeesList = () => {
  console.log('EmployeesList')

  const activeParentsId = useAppSelector(state => state.employees.activeParentsId)
  const employees = useAppSelector(state => state.employees.employees)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

  }



  return <div className={styles.employeesList}>
    {employees.map(el => {
      return <div key={el.id}><input type={'checkbox'} checked={el.checked} onChange={onChangeHandler}/> {el.name} - {el.surname} - {el.jobTitle}</div>
    })}
  </div>
}