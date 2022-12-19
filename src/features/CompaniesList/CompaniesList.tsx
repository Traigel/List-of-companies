import React, {useEffect} from 'react';
import styles from './CompaniesList.module.scss';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {getCompanies, removeCompanies, setCompanyAllChecked} from './companiesList-actions';
import {TableHeaderRow} from '../../common/components/TableHeaderRow/TableHeaderRow';
import {CreateCompany} from './CreateCompany/CreateCompany';
import {TableBodyCompanies} from './TableBodyCompanies/TableBodyCompanies';
import {Button} from '../../common/components/Button/Button';
import {SvgSelector} from '../../common/components/SvgSelector';

export const CompaniesList = () => {

  const dispatch = useAppDispatch()
  const allChecked = useAppSelector(state => state.companies.allChecked)
  const activeCompanyId = useAppSelector(state => state.companies.activeCompanyId)

  useEffect(() => {
    dispatch(getCompanies())
  }, [])

  const onChangeAllCompaniesHandler = (checked: boolean) => {
    dispatch(setCompanyAllChecked({checked}))
  }

  const onClickRemoveHandler = () => dispatch(removeCompanies())

  return <div className={styles.companiesList}>
    <CreateCompany/>
    <div className={styles.table}>
      <TableHeaderRow
        checked={allChecked}
        onChange={onChangeAllCompaniesHandler}
        checkedLabel={'Выделить всё'}
        secondTableCell={'Название компании'}
        thirdTableCell={'Кол-во сотрудников'}
        fourthTableCell={'Адрес'}
      />
      <TableBodyCompanies/>
    </div>
    <Button disabled={!activeCompanyId.length} typeStyle={'error'} onClick={onClickRemoveHandler}>
      <SvgSelector type={'delete'}/> Удалить компании
    </Button>
  </div>
}