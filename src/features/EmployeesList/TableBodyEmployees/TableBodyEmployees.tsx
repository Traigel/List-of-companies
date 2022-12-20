import React, {useEffect, useRef, useState} from 'react';
import styles from './TableBodyEmployees.module.scss';
import {setEmployeesChecked, updateEmployees} from '../employeesList-actions';
import {TableRow} from '../../../common/components/TableRow/TableRow';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {ROW_HEIGHT, VISIBLE_ROWS} from '../../../common/constants';

export const TableBodyEmployees = () => {

  const dispatch = useAppDispatch()
  const activeCompanyId = useAppSelector(state => state.companies.activeCompanyId)
  const employees = useAppSelector(state => state.employees.employees)

  const filterEmployees = employees.filter(el => activeCompanyId.includes(el.parentId))

  const rootRef = useRef<HTMLDivElement | null>(null)

  const [start, setStart] = useState<number>(0)

  useEffect(() => {

    const onScroll = (e: any) => {
      setStart(Math.min(
        filterEmployees.length - VISIBLE_ROWS,
        Math.floor(e.target.scrollTop / ROW_HEIGHT)
      ));
    }

    rootRef.current!.addEventListener('scroll', onScroll);

    return () => {
      rootRef.current!.removeEventListener('scroll', onScroll);
    }
  }, [VISIBLE_ROWS, ROW_HEIGHT, filterEmployees.length])


  return <div className={styles.tableBody} style={{height: ROW_HEIGHT * VISIBLE_ROWS}} ref={rootRef}>

    <div style={{height: filterEmployees.length ? ROW_HEIGHT * start : 0}}></div>

    {filterEmployees.length
      ? filterEmployees.slice(start, start + VISIBLE_ROWS + 1).map((el, index) => {

        const onChangeHandler = (checked: boolean) => {
          dispatch(setEmployeesChecked({employeeId: el.id, checked}))
        }

        const setNameHandler = (value: string) => {
          dispatch(updateEmployees({
            parentId: el.parentId,
            id: el.id,
            name: value,
          }))
        }

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
          key={start + el.id}
          checked={el.checked}
          onChange={onChangeHandler}
          secondTableCell={el.name}
          setSecondTableCell={setNameHandler}
          thirdTableCell={el.surname}
          setThirdTableCell={setSurnameHandler}
          fourthTableCell={el.jobTitle}
          setFourthTableCell={setJobTitleHandler}
        />

      })
      : <div className={styles.title}>Выберите компанию чтобы увидеть сотрудников</div>
    }

    <div
      style={{height: filterEmployees.length ? ROW_HEIGHT * (filterEmployees.length - VISIBLE_ROWS) - start * ROW_HEIGHT : 0}}></div>
  </div>
}