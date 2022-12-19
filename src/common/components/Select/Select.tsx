import React, {DetailedHTMLProps, SelectHTMLAttributes} from 'react'
import styles from './Select.module.scss'
import {CompanyType} from '../../../features/CompaniesList/companiesList-reducer'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SelectPropsType = DefaultSelectPropsType & {
  title: string
  options: CompanyType[]
  className?: string
}

export const Select = ({title, options, className, ...restProps}: SelectPropsType) => {

  const classNameFinal = `${styles.select}  ${className}`

  return (
    <select className={classNameFinal} {...restProps}>
      <option value={''}>{title}</option>
      {options?.map((el, i) => <option key={i} value={el.id}>{el.title}</option>)}
    </select>
  )
}