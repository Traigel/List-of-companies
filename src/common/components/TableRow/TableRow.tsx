import React, {ChangeEvent} from 'react';
import styles from './TableRow.module.scss';
import {EditableTableCell} from '../EditableTableCell/EditableTableCell';
import {ROW_HEIGHT} from '../../constants';

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

  const tableRowStyles = `${styles.tableRow} ${checked ? styles.active : ''}`

  return <div className={tableRowStyles} style={{height: ROW_HEIGHT - 1}}>
    <div className={styles.checkboxTableCell}><input type={'checkbox'} checked={checked} onChange={onChangeHandler}/>
    </div>
    <div className={styles.secondTableCell}>
      <EditableTableCell setTitle={setSecondTableCell} title={secondTableCell} disabled={false}/>
    </div>
    <div className={styles.thirdTableCell}>
      {typeof thirdTableCell === 'string'
        ? <EditableTableCell setTitle={setThirdTableCellHandler} title={thirdTableCell} disabled={false}/>
        : thirdTableCell}
    </div>
    <div className={styles.fourthTableCell}>
      <EditableTableCell setTitle={setFourthTableCell} title={fourthTableCell} disabled={false}/>
    </div>
  </div>
}