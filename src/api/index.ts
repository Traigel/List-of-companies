import {companiesData, employeesData, errorResponse} from './serverData';

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
    const employee = employeesData[param.companyId].find(el => el.id === param.id) as ResponseEmployeeType
    return await new Promise<ResponseEmployeeType>((resolve) => {
      setTimeout(() => resolve({...employee, ...param}), randomRequestTime(2000));
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

export type RequestUpdateCompanyType = {
  id: string
  title?: string
  qtyEmployees?: number
  address?: string
}

export type RequestUpdateEmployeeType = {
  companyId: string
  id: string
  surname?: string
  name?: string
  jobTitle?: string
}