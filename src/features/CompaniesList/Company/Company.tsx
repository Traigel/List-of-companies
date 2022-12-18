import React, {ChangeEvent, useEffect} from 'react';
import {CompaniesType} from '../companiesList-reducer';
import {useAppDispatch} from '../../../common/hooks';
import {getEmployees} from '../../EmployeesList/employeesList-actions';
import { setCompanyChecked } from '../companiesList-actions';

type CompanyPropsType = {
  company: CompaniesType
}

export const Company = ({company}: CompanyPropsType) => {

  const dispatch = useAppDispatch()

  useEffect( () => {
    dispatch(getEmployees({companyId: company.id}))
  }, [])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCompanyChecked({companyId: company.id, checked: e.currentTarget.checked}))
  }

  return <div>
    <div><input type={'checkbox'} checked={company.checked} onChange={onChangeHandler}/> {company.title} - {company.qtyEmployees} - {company.address}</div>
  </div>
}
