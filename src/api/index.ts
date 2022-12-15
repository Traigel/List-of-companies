import {companiesData, employeesData, errorResponse} from './serverData';

const randomRequestTime = (maxMs: number) => Math.random() * maxMs

export const companiesAPI = {
  getCompanies: async () => {
    return await new Promise<ResponseCompanyType[]>((resolve) => {
      setTimeout(() => resolve(companiesData), randomRequestTime(2000));
    });
  },
  serverRequest: async ({companyId}: { companyId: string }) => {
    return await new Promise<string>((resolve) => {
      setTimeout(() => resolve('Status Code: 200'), randomRequestTime(2000));
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
  serverRequest: async ({companyId, employeeId}: RequestEmployeeParamsType) => {
    return await new Promise<string>((resolve) => {
      setTimeout(() => resolve('Status Code: 200'), randomRequestTime(2000));
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

export type RequestEmployeeParamsType = {
  companyId: string
  employeeId: string
}