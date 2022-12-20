import {companiesData, employeesData, errorResponse} from './serverData';
import {v1} from 'uuid';

const randomRequestTime = (maxMs: number) => Math.random() * maxMs

export const companiesAPI = {
  getCompanies: async () => {
    return await new Promise<ResponseCompanyType[]>((resolve) => {
      setTimeout(() => resolve(companiesData), randomRequestTime(2000));
    });
  },
  updateCompany: async (param: RequestUpdateCompanyType) => {
    return await new Promise<ResponseCompanyType>((resolve) => {
      const company = companiesData.find(el => el.id === param.id) as ResponseCompanyType
      setTimeout(() => resolve({...company, ...param}), randomRequestTime(2000));
    });
  },
  createCompany: async (param: RequestCreateCompanyType) => {
    return await new Promise<ResponseCompanyType>((resolve) => {
      setTimeout(() => resolve({id: v1(), qtyEmployees: 0, ...param}), randomRequestTime(2000));
    });
  },
  removeCompanies: async ({companiesId}: {companiesId: string[]}) => {
    return await new Promise<{serverMessage: string}>((resolve) => {
      setTimeout(() => resolve({ serverMessage: 'Companies deleted successfully'}), randomRequestTime(2000));
    });
  },
  errorResponse: async () => {
    return await new Promise<string>((resolve, reject) => {
      setTimeout(() => reject(errorResponse), randomRequestTime(2000));
    });
  }
}

export const employeesAPI = {
  getEmployees: async ({companyId}: { companyId: string }) => {
    return await new Promise<ResponseEmployeeType[]>((resolve) => {
      setTimeout(() => resolve(employeesData[companyId]), randomRequestTime(2000));
    });
  },
  updateEmployee: async (param: RequestUpdateEmployeeType) => {
    return await new Promise<string>((resolve) => {
      setTimeout(() => resolve('Code 200'), randomRequestTime(2000));
    });
  },
  createEmployee: async (param: RequestCreateEmployeeType) => {
    return await new Promise<ResponseCompanyEmployeeType>((resolve) => {
      setTimeout(() => resolve({id: v1(), ...param }), randomRequestTime(2000));
    });
  },
  removeEmployees: async ({employeesId}: {employeesId: string[]}) => {
    return await new Promise<{serverMessage: string}>((resolve) => {
      setTimeout(() => resolve({ serverMessage: 'Employees deleted successfully'}), randomRequestTime(2000));
    });
  }
}

// Types
export type ResponseCompanyType = {
  id: string
  title: string
  qtyEmployees: number
  address: string
}

export type ResponseEmployeeType = {
  id: string
  surname: string
  name: string
  jobTitle: string
}

export type ResponseCompanyEmployeeType = ResponseEmployeeType & {parentId: string}

export type RequestUpdateCompanyType = {
  id: string
  title?: string
  qtyEmployees?: number
  address?: string
}

export type RequestUpdateEmployeeType = {
  parentId: string
  id: string
  surname?: string
  name?: string
  jobTitle?: string
}

export type RequestCreateCompanyType = {
  title: string
  address: string
}

export type RequestCreateEmployeeType = {
  parentId: string
  surname: string
  name: string
  jobTitle: string
}
