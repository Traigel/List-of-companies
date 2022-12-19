import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from '../../../common/hooks';
import {createCompany} from '../companiesList-actions';

export const CreateCompany = () => {

  const dispatch = useAppDispatch()

  const [companyName, setCompanyName] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const onChangeCompanyNameHandler = (e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.currentTarget.value)
  const onChangeAddressHandler = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)
  const onClickHandler = () => {
    dispatch(createCompany({title: companyName, address}))
  }

  return <div>
    <input type="text" value={companyName} onChange={onChangeCompanyNameHandler} placeholder={'Название компании'}/>
    <input type="text" value={address} onChange={onChangeAddressHandler} placeholder={'Адрес'}/>
    <button onClick={onClickHandler}>Добавить компанию</button>
  </div>
}