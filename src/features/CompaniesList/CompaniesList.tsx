import React, {useEffect} from 'react';
import styles from './CompaniesList.module.scss';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {
  getCompanies, removeCompanies,
  setCompanyAllChecked,
  setCompanyChecked,
  updateCompany
} from './companiesList-actions';
import {TableRow} from '../../common/components/TableRow/TableRow';
import {TableHeaderRow} from '../../common/components/TableHeaderRow/TableHeaderRow';
import {CreateCompany} from './CreateCompany/CreateCompany';

export const CompaniesList = () => {
  console.log('CompaniesList')

  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)
  const allChecked = useAppSelector(state => state.companies.allChecked)

  useEffect(() => {
    dispatch(getCompanies())
  }, [])

  const onChangeAllCompaniesHandler = (checked: boolean) => {
    dispatch(setCompanyAllChecked({checked}))
  }

  const onClickRemoveHandler = () => dispatch(removeCompanies())

  return <div className={styles.companiesList}>

    <CreateCompany/>

    <table className={styles.companyBox}>
      <thead>
      <TableHeaderRow
        checked={allChecked}
        onChange={onChangeAllCompaniesHandler}
        checkedLabel={'Выделить всё'}
        secondTableCell={'Название компании'}
        thirdTableCell={'Кол-во сотрудников'}
        fourthTableCell={'Адрес'}
      />
      </thead>

      <tbody className={styles.tableBody}>
      {companies.map(el => {

        const onChangeCompanyHandler = (checked: boolean) => {
          dispatch(setCompanyChecked({companyId: el.id, checked}))
        }

        const setTitleHandler = (value: string) => dispatch(updateCompany({id: el.id, title: value}))

        const setAddressHandler = (value: string) => dispatch(updateCompany({id: el.id, address: value}))

        return <TableRow
          key={el.id}
          checked={el.checked}
          onChange={onChangeCompanyHandler}
          secondTableCell={el.title}
          setSecondTableCell={setTitleHandler}
          thirdTableCell={el.qtyEmployees}
          fourthTableCell={el.address}
          setFourthTableCell={setAddressHandler}
        />
      })}
      </tbody>


    </table>

    <button onClick={onClickRemoveHandler}>Удалить компании</button>

  </div>
}