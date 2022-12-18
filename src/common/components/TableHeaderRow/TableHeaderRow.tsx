import React, {ChangeEvent} from 'react';
import styles from './TableRow.module.scss';

type TableRowPropsType = {
  checked: boolean
  checkedLabel: string
  secondTableCell: string
  thirdTableCell: string
  fourthTableCell: string
  onChange: (checked: boolean) => void

}

export const TableHeaderRow = ({
                           checked,
                           onChange,
                           secondTableCell,
                           thirdTableCell,
                           fourthTableCell,
                           checkedLabel
                         }: TableRowPropsType) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.checked)

  return <tr>
    <td><label><input type={'checkbox'} checked={checked} onChange={onChangeHandler}/>{checkedLabel}</label></td>
    <td>{secondTableCell} </td>
    <td>{thirdTableCell}</td>
    <td>{fourthTableCell}</td>
  </tr>
}