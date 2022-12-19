import React from 'react';
import styles from './TableBodyEmployees.module.scss';
import {setEmployeesChecked, updateEmployees} from '../employeesList-actions';
import {TableRow} from '../../../common/components/TableRow/TableRow';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';

export const TableBodyEmployees = () => {

  const dispatch = useAppDispatch()
  const activeCompanyId = useAppSelector(state => state.companies.activeCompanyId)
  const employees = useAppSelector(state => state.employees.employees)

  const filterEmployees = employees.filter(el => activeCompanyId.includes(el.parentId))

  return <div className={styles.tableBody}>
    {filterEmployees.map(el => {

      const onChangeHandler = (checked: boolean) => {
        dispatch(setEmployeesChecked({employeeId: el.id, checked}))
      }

      const setNameHandler = (value: string) => dispatch(updateEmployees({
        parentId: el.parentId,
        id: el.id,
        name: value,
      }))

      const setSurnameHandler = (value: string) => dispatch(updateEmployees({
        parentId: el.parentId,
        id: el.id,
        surname: value,
      }))

      const setJobTitleHandler = (value: string) => dispatch(updateEmployees({
        parentId: el.parentId,
        id: el.id,
        jobTitle: value
      }))


      return <TableRow
        key={el.id}
        checked={el.checked}
        onChange={onChangeHandler}
        secondTableCell={el.name}
        setSecondTableCell={setNameHandler}
        thirdTableCell={el.surname}
        setThirdTableCell={setSurnameHandler}
        fourthTableCell={el.jobTitle}
        setFourthTableCell={setJobTitleHandler}
      />

    })}
  </div>
}