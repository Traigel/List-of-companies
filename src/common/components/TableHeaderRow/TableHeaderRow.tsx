import React, {ChangeEvent} from 'react';
import styles from './TableHeaderRow.module.scss';

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

  return <div className={styles.tableHeaderRow}>
    <div className={styles.checkboxTableCell}>
      <label>
        <input type={'checkbox'} checked={checked} onChange={onChangeHandler}/>{checkedLabel}
      </label>
    </div>
    <div className={styles.secondTableCell}>{secondTableCell} </div>
    <div className={styles.thirdTableCell}>{thirdTableCell}</div>
    <div className={styles.fourthTableCell}>{fourthTableCell}</div>
  </div>
}