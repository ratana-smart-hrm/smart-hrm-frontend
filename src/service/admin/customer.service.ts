"use server";

import { IApiResponse, ICustomer, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface ICustomersRes {
  customers?: ICustomer[];
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

export const getAllCustomers = async (): Promise<ICustomersRes> => {
  const data = await api.get<IApiResponse<ICustomer[]>>(`/customers`);
  return {
    customers: data.data,
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
