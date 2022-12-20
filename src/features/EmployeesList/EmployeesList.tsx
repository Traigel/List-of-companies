import React from 'react';
import styles from './EmployeesList.module.scss';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {removeEmployees, setEmployeeAllChecked} from './employeesList-actions';
import {TableHeaderRow} from '../../common/components/TableHeaderRow/TableHeaderRow';
import {CreateEmployee} from './CreateEmployee/CreateEmployee';
import {TableBodyEmployees} from './TableBodyEmployees/TableBodyEmployees';
import {SvgSelector} from '../../common/components/SvgSelector';
import {Button} from '../../common/components/Button/Button';

export const EmployeesList = () => {

  const dispatch = useAppDispatch()
  const activeEmployeesId = useAppSelector(state => state.employees.activeEmployeesId)
  const activeCompanyId = useAppSelector(state => state.companies.activeCompanyId)
  const allChecked = useAppSelector(state => state.employees.allChecked)

  const onChangeAllEmployeesHandler = (checked: boolean) => {
    dispatch(setEmployeeAllChecked({checked, activeCompanyId}))
  }

  const onClickRemoveHandler = () => dispatch(removeEmployees())


  return <div className={styles.employeesList}>
    <CreateEmployee/>
    <div className={styles.table}>
      <TableHeaderRow
        checked={allChecked}
        onChange={onChangeAllEmployeesHandler}
        checkedLabel={'Выделить всё'}
        secondTableCell={'Фамилия'}
        thirdTableCell={'Имя'}
        fourthTableCell={'Должность'}
      />
      <TableBodyEmployees/>
    </div>
    <Button disabled={!activeEmployeesId.length} typeStyle={'error'} onClick={onClickRemoveHandler}>
      <SvgSelector type={'delete'}/> Удалить сотрудников
    </Button>
  </div>
}