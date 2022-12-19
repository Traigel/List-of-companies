import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styles from './InputText.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputText = ({className, ...restProps}: DefaultInputPropsType) => {

  const finalInputClassName = `${styles.input} ${className}`

  return (
    <>
      <input
        type={'text'}
        className={finalInputClassName}
        {...restProps}
      />
    </>
  )
}