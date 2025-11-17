"use server";

import { IApiResponse, IEmployee, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IEmployeesRes {
  employees?: IEmployee[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IEmployeeRes {
  employee?: IEmployee;
}

export interface ICreateEmployeeRequest {
  empCode?: string;
  firstName?: string;
  lastName?: string;
  firstNameKh?: string;
  gender?: string;
  position?: string;
  joinedDate?: string;
  status?: string;
  salary?: string;
}

export interface IUpdateEmployeeRequest {
  empCode?: string;
  firstName?: string;
  lastName?: string;
  firstNameKh?: string;
  gender?: string;
  position?: string;
  joinedDate?: string;
  status?: string;
  salary?: string;
}

export const getAllEmployees = async (
  pageIndex: number,
  pageSize?: number
): Promise<IEmployeesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IEmployee[]>>(
    `/employees?page=${page}&limit=${pageSize}`
  );
  return {
    employees: data.data,
    pagination: data.pagination,
  };
};

export const getEmployeeById = async (
  employeeId?: number
): Promise<IEmployeeRes> => {
  const data = await api.get<IApiResponse<IEmployee>>(
    `/employees/${employeeId}`
  );
  return {
    employee: data.data,
  };
};

export const createEmployee = async (
  request: ICreateEmployeeRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/employees`, request);
};

export const updateEmployee = async (
  employeeId?: number,
  request?: IUpdateEmployeeRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/employees/${employeeId}`, request);
};

export const deleteEmployee = async (employeeId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/employees/${employeeId}`);
};
