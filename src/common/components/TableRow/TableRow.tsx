import React, {ChangeEvent} from 'react';
import styles from './TableRow.module.scss';
import {EditableTableCell} from '../EditableTableCell/EditableTableCell';

type TableRowPropsType = {
  checked: boolean
  secondTableCell: string
  setSecondTableCell: (value: string) => void
  thirdTableCell: string | number
  setThirdTableCell?: (value: string) => void
  fourthTableCell: string
  setFourthTableCell: (value: string) => void
  onChange: (checked: boolean) => void

}

export const TableRow = ({
                           checked,
                           onChange,
                           secondTableCell,
                           thirdTableCell,
                           fourthTableCell,
                           setFourthTableCell,
                           setThirdTableCell,
                           setSecondTableCell
                         }: TableRowPropsType) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.checked)

  const setThirdTableCellHandler = (value: string) => setThirdTableCell && setThirdTableCell(value)

  return <tr className={styles.tableRow}>
    <td><input type={'checkbox'} checked={checked} onChange={onChangeHandler}/></td>
    <td>
      <EditableTableCell setTitle={setSecondTableCell} title={secondTableCell} disabled={false}/>
    </td>
    <td>
      {typeof thirdTableCell === 'string'
        ? <EditableTableCell setTitle={setThirdTableCellHandler} title={thirdTableCell} disabled={false}/>
        : thirdTableCell}
    </td>
    <td>
      <EditableTableCell setTitle={setFourthTableCell} title={fourthTableCell} disabled={false}/>
    </td>
  </tr>
}