import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {createEmployee} from '../employeesList-actions';

export const CreateEmployee = () => {

  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.companies)

  const [surname, setSurname] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [jobTitle, setJobTitle] = useState<string>('')
  const [select, setSelect] = useState<string>('')

  const onChangeSurnameHandler = (e: ChangeEvent<HTMLInputElement>) => setSurname(e.currentTarget.value)
  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)
  const onChangeJobTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setJobTitle(e.currentTarget.value)
  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => setSelect(e.currentTarget.value)

  const onClickHandler = async () => {
    await dispatch(createEmployee({parentId: select, name, surname, jobTitle}))
    setSurname('')
    setName('')
    setJobTitle('')
    setSelect('')
  }

  return <div>
    <input type="text" value={surname} onChange={onChangeSurnameHandler} placeholder={'Фамилия'}/>
    <input type="text" value={name} onChange={onChangeNameHandler} placeholder={'Имя'}/>
    <input type="text" value={jobTitle} onChange={onChangeJobTitleHandler} placeholder={'Должность'}/>

    <select value={select} required onChange={onChangeSelectHandler}>
      <option value={''}>Выбрать компанию</option>
      {companies.map(el => <option key={el.id} value={el.id}>{el.title}</option>)}
    </select>
    <button onClick={onClickHandler}>Добавить сотрудника</button>
  </div>
}