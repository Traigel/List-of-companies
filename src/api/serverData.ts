import {v1} from 'uuid';
import {ResponseCompanyType, ResponseEmployeeType} from './index';

// CompaniesData
const companyId1 = v1()
const companyId2 = v1()
const companyId3 = v1()
const companyId4 = v1()
const companyId5 = v1()
const companyId6 = v1()
const companyId7 = v1()

export const companiesData: ResponseCompanyType[] = [
  {
    id: companyId1,
    title: 'ГК "Адепт"',
    qtyEmployees: 50,
    address: 'проспект Гагарина, 50к9'
  },
  {
    id: companyId2,
    title: 'Your Dev Team',
    qtyEmployees: 45,
    address: 'ул. Красноармейская 15'
  },
  {
    id: companyId3,
    title: 'Senla',
    qtyEmployees: 85,
    address: 'ул. Современная 12'
  },
  {
    id: companyId4,
    title: 'IntexSoft',
    qtyEmployees: 65,
    address: 'ул. Центральная 55'
  },
  {
    id: companyId5,
    title: 'EPAM',
    qtyEmployees: 80,
    address: 'ул. Ожешко 8'
  },
  {
    id: companyId6,
    title: 'Dynevo',
    qtyEmployees: 35,
    address: 'ул. Програмиская 19'
  },
  {
    id: companyId7,
    title: 'Большая',
    qtyEmployees: 10000,
    address: 'ул. Весёлая 49'
  },
]

// EmployeesData
const returnEmployeeObject = (index: number, arrSurname: string[], arrName: string[], arrJobTitle: string[]) => ({
  id: v1(),
  surname: arrSurname[index % arrSurname.length],
  name: arrName[index % arrName.length],
  jobTitle: arrJobTitle[index % arrJobTitle.length]
})

const arrSurname = ['Живаго', 'Грабчак', 'Дюма', 'Штольберг', 'Шапиро', 'Нетто']
const arrName = ['Владимир', 'Александра', 'Николай', 'Екатерина', 'Константин', 'Елена', 'Дмитрий']
const arrJobTitle = ['Frontend-разработчик', 'Backend-разработчик', 'Тестировщик', 'Тимлид', 'Гейм-дизайнер', 'QA-инженер', 'HR-менеджер', 'Менеджер проекта']

export const employeesData: { [companyId: string]: ResponseEmployeeType[] } = {
  [companyId1]: Array(companiesData[0].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  })),
  [companyId2]: Array(companiesData[1].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  })),
  [companyId3]: Array(companiesData[2].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  })),
  [companyId4]: Array(companiesData[3].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  })),
  [companyId5]: Array(companiesData[4].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  })),
  [companyId6]: Array(companiesData[5].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  })),
  [companyId7]: Array(companiesData[6].qtyEmployees).fill(null).map((_, index) => ({
    ...returnEmployeeObject(index, arrSurname, arrName, arrJobTitle)
  }))
}

// Error response
export type AxiosError<T> = { data: T }

export const errorResponse = {
  data: {
    message: 'Server error, please try again later'
  }
}