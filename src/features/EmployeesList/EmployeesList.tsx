import React from 'react';
import styles from './EmployeesList.module.scss';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {TableRow} from '../../common/components/TableRow/TableRow';
import {removeEmployees, setEmployeeAllChecked, setEmployeesChecked, updateEmployees} from './employeesList-actions';
import {TableHeaderRow} from '../../common/components/TableHeaderRow/TableHeaderRow';
import {CreateEmployee} from './CreateEmployee/CreateEmployee';

export const EmployeesList = () => {
  console.log('EmployeesList')

  const dispatch = useAppDispatch()
  const activeCompanyId = useAppSelector(state => state.companies.activeCompanyId)
  const employees = useAppSelector(state => state.employees.employees)
  const allChecked = useAppSelector(state => state.employees.allChecked)

  const onChangeAllEmployeesHandler = (checked: boolean) => {
    dispatch(setEmployeeAllChecked({checked}))
  }

  const onClickRemoveHandler = () => dispatch(removeEmployees())

  const filterEmployees = employees.filter(el => activeCompanyId.includes(el.parentId))

  return <div className={styles.employeesList}>

    <CreateEmployee/>

    <table>
      <thead>
      <TableHeaderRow
        checked={allChecked}
        onChange={onChangeAllEmployeesHandler}
        checkedLabel={'Выделить всё'}
        secondTableCell={'Фамилия'}
        thirdTableCell={'Имя'}
        fourthTableCell={'Должность'}
      />
      </thead>
    </table>

    <table className={styles.table}>

      <tbody className={styles.tableBody}>
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
      </tbody>

    </table>

    <button onClick={onClickRemoveHandler}>Удалить сотрудников</button>

  </div>
}