"use server";

import {
  IApiResponse,
  IContractType,
  IHoliday,
  IPagination,
} from "@/types/admin";
import { api } from "../util/api";

export interface IContractTypesRes {
  contractTypes?: IContractType[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface IContractTypeRes {
  contractType?: IContractType;
}

export interface ICreateContractTypeRequest {
  name: string;
  code: string;
}

export interface IUpdateContractTypeRequest {
  name: string;
  code: string;
}

export const getAllContractTypes = async (
  pageIndex: number,
  pageSize?: number
): Promise<IContractTypesRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<IContractType[]>>(
    `/contract-types?page=${page}&limit=${pageSize}`
  );
  return {
    contractTypes: data.data,
    pagination: data.pagination,
  };
};

export const getAllContractTypeList = async (): Promise<IContractTypesRes> => {
  const data = await api.get<IApiResponse<IContractType[]>>(`/contract-types`);
  return {
    contractTypes: data.data,
    pagination: data.pagination,
  };
};

export const getContractTypeById = async (
  contractTypeId?: number
): Promise<IContractTypeRes> => {
  const data = await api.get<IApiResponse<IContractType>>(
    `/contract-types/${contractTypeId}`
  );
  return {
    contractType: data.data,
  };
};

export const createContractType = async (
  request: ICreateContractTypeRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/contract-types`, request);
};

export const updateContractType = async (
  contractTypeId?: number,
  request?: IUpdateContractTypeRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(
    `/contract-types/${contractTypeId}`,
    request
  );
};

export const deleteContractType = async (
  contractTypeId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/contract-types/${contractTypeId}`);
};
