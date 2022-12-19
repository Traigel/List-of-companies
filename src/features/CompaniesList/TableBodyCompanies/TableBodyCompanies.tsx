import React from 'react';
import styles from './TableBodyCompanies.module.scss';
import {setCompanyChecked, updateCompany} from '../companiesList-actions';
import {TableRow} from '../../../common/components/TableRow/TableRow';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';

export const TableBodyCompanies = () => {

  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)

  return <div className={styles.tableBody}>
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
  </div>
}