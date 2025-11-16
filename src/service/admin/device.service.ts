"use server";

import { IApiResponse, ICustomer, IDevice, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IDevicesRes {
  devices?: IDevice[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface ICustomerRes {
  customer?: ICustomer;
}

export interface ICreateCustomerRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface IUpdateCustomerRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const getAllDevices = async (): Promise<IDevicesRes> => {
  const data = await api.get<IApiResponse<IDevice[]>>(`/devices`);
  return {
    devices: data.data,
    pagination: data.pagination,
  };
};
export const getAllHolidays = async (pageIndex: number,  pageSize?: number): Promise<IHolidaysRes> => {
  console.log('pageIndex', pageIndex)
  console.log('pageSize', pageSize)
  // Convert 0-based pageIndex to 1-based page for API
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IHoliday[]>>(`/holidays?page=${page}&limit=${pageSize}`);
  return {
    holidays: data.data,
    pagination: data.pagination,
  };
};

export const getCustomerById = async (
  customerId?: number
): Promise<ICustomerRes> => {
  const data = await api.get<IApiResponse<ICustomer>>(
    `/customers/${customerId}`
  );
  return {
    customer: data.data,
  };
};

export const createCustomer = async (
  request: ICreateCustomerRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/customers`, request);
};

export const updateCustomer = async (
  customerId?: number,
  request?: IUpdateCustomerRequest
): Promise<void> => {
  await api.put<IApiResponse<void>>(`/customers/${customerId}`, request);
};

export const deleteCustomer = async (customerId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/customers/${customerId}`);
};
