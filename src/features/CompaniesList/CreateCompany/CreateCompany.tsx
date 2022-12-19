import React, {ChangeEvent, useState} from 'react';
import styles from './CreateCompany.module.scss';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {createCompany} from '../companiesList-actions';
import {InputText} from '../../../common/components/InputText/InputText';
import {Button} from '../../../common/components/Button/Button';
import {setAppError} from '../../../app/app-reducer';
import {SvgSelector} from '../../../common/components/SvgSelector';

export const CreateCompany = () => {

  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)

  const [companyName, setCompanyName] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const onChangeCompanyNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setCompanyName(e.currentTarget.value)
    } else {
      dispatch(setAppError({message: 'Название компании не может начинаться с пробела'}))
    }

  }
  const onChangeAddressHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setAddress(e.currentTarget.value)
    } else {
      dispatch(setAppError({message: 'Адрес не может начинаться с пробела'}))
    }
  }

  const onClickHandler = async () => {
    if (companyName && address) {
      await dispatch(createCompany({title: companyName, address}))
      setCompanyName('')
      setAddress('')
    } else {
      dispatch(setAppError({message: 'Введите название и адрес компании'}))
    }
  }

  return <div className={styles.createCompany}>
    <div className={styles.inputBox}>
      <InputText
        disabled={status === 'loading'}
        value={companyName}
        onChange={onChangeCompanyNameHandler}
        placeholder={'Название компании'}
      />
      <InputText
        disabled={status === 'loading'}
        value={address}
        onChange={onChangeAddressHandler}
        placeholder={'Адрес'}
      />
    </div>
    <Button disabled={status === 'loading'} onClick={onClickHandler}>
      <SvgSelector type={'create'}/> Добавить компанию
    </Button>
  </div>
}