import React, {ChangeEvent, useState} from 'react';
import styles from './CreateEmployee.module.scss';
import {InputText} from '../../../common/components/InputText/InputText';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {createEmployee} from '../employeesList-actions';
import {Select} from '../../../common/components/Select/Select';
import {SvgSelector} from '../../../common/components/SvgSelector';
import {Button} from '../../../common/components/Button/Button';
import {setAppError} from '../../../app/app-reducer';

export const CreateEmployee = () => {

  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const companies = useAppSelector(state => state.companies.companies)

  const [surname, setSurname] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [jobTitle, setJobTitle] = useState<string>('')
  const [select, setSelect] = useState<string>('')

  const onChangeSurnameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setSurname(e.currentTarget.value)
    } else {
      dispatch(setAppError({message: 'Фамилия не может начинаться с пробела'}))
    }
  }
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setName(e.currentTarget.value)
    } else {
      dispatch(setAppError({message: 'Имя не может начинаться с пробела'}))
    }
  }
  const onChangeJobTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setJobTitle(e.currentTarget.value)
    } else {
      dispatch(setAppError({message: 'Должность не может начинаться с пробела'}))
    }
  }
  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => setSelect(e.currentTarget.value)

  const onClickHandler = async () => {
    if (surname && name && jobTitle && select) {
      await dispatch(createEmployee({parentId: select, name, surname, jobTitle}))
      setSurname('')
      setName('')
      setJobTitle('')
    } else {
      dispatch(setAppError({message: 'Заполните все поля'}))
    }
  }

  return <div className={styles.createEmployee}>
    <div className={styles.inputBox}>
      <InputText
        disabled={status === 'loading'}
        value={surname}
        onChange={onChangeSurnameHandler}
        placeholder={'Фамилия'}
      />
      <InputText
        disabled={status === 'loading'}
        value={name}
        onChange={onChangeNameHandler}
        placeholder={'Имя'}/>
    </div>

    <div className={styles.inputBox}>
      <InputText
        disabled={status === 'loading'}
        value={jobTitle}
        onChange={onChangeJobTitleHandler}
        placeholder={'Должность'}
      />
      <Select
        disabled={status === 'loading'}
        options={companies}
        title={'Выбрать компанию'}
        onChange={onChangeSelectHandler}
      />
    </div>

    <Button disabled={status === 'loading'} onClick={onClickHandler}>
      <SvgSelector type={'create'}/> Добавить сотрудника
    </Button>
  </div>
}