import React, {useEffect, useRef, useState} from 'react';
import styles from './TableBodyCompanies.module.scss';
import {setCompanyChecked, updateCompany} from '../companiesList-actions';
import {TableRow} from '../../../common/components/TableRow/TableRow';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {ROW_HEIGHT, VISIBLE_ROWS} from '../../../common/constants';

export const TableBodyCompanies = () => {

  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)

  const rootRef = useRef<HTMLDivElement | null>(null)

  const [start, setStart] = useState<number>(0)

  useEffect(() => {

    const onScroll = (e: any) => {
      setStart(Math.min(
        companies.length - VISIBLE_ROWS,
        Math.floor(e.target.scrollTop / ROW_HEIGHT)
      ));
    }

    rootRef.current!.addEventListener('scroll', onScroll);

    return () => {
      rootRef.current!.removeEventListener('scroll', onScroll);
    }
  }, [VISIBLE_ROWS, ROW_HEIGHT, companies.length])

  return <div className={styles.tableBody} style={{height: ROW_HEIGHT * VISIBLE_ROWS}} ref={rootRef}>

    <div style={{height: companies.length ? ROW_HEIGHT * start : 0}}></div>

    {companies.length
      ? companies.slice(start, start + VISIBLE_ROWS + 1).map((el, index) => {

        const onChangeCompanyHandler = (checked: boolean) => {
          dispatch(setCompanyChecked({companyId: el.id, checked}))
        }

        const setTitleHandler = (value: string) => dispatch(updateCompany({id: el.id, title: value}))

        const setAddressHandler = (value: string) => dispatch(updateCompany({id: el.id, address: value}))

        return <TableRow
          key={start + index + el.id}
          checked={el.checked}
          onChange={onChangeCompanyHandler}
          secondTableCell={el.title}
          setSecondTableCell={setTitleHandler}
          thirdTableCell={el.qtyEmployees}
          fourthTableCell={el.address}
          setFourthTableCell={setAddressHandler}
        />
      })
      : <div className={styles.title}>Добавьте компанию</div>
    }

    <div
      style={{height: companies.length ? ROW_HEIGHT * (companies.length - VISIBLE_ROWS) - start * ROW_HEIGHT : 0}}></div>
  </div>
}