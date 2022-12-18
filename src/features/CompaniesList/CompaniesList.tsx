import React, {useEffect} from 'react';
import styles from './CompaniesList.module.scss';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {getCompanies} from './companiesList-actions';
import {Company} from './Company/Company';

export const CompaniesList = () => {
  console.log('CompaniesList')

  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)

  useEffect( () => {
    dispatch(getCompanies())
  }, [])

  return <div className={styles.companiesList}>
    <div className={styles.companyBox}>
      { companies.map(el => <Company key={el.id} company={el}/>) }
    </div>

  </div>
}