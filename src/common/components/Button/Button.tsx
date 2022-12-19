import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
  typeStyle?: 'error' | 'active'
  disabled?: boolean
}
export const Button = ({className, typeStyle, disabled, ...restProps}: ButtonPropsType) => {

  const finalClassName =
    `${styles.button} 
  ${typeStyle ? typeStyle === 'error' ? styles.error : styles.active : styles.active}
  ${disabled ? styles.disabled : ''}
  ${className}`

  return (
    <button
      className={finalClassName}
      disabled={disabled}
      {...restProps}
    />
  )
}