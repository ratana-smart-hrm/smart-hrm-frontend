"use server";

import { IApiResponse, ICategory, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface ICategoriesRes {
  categories?: ICategory[];
  pagination?: IPagination;
}

export interface ICategoryRes {
  category?: ICategory;
}

export interface ICreateCategoryRequest {
  name: string;
  isActive: boolean;
}

export interface IUpdateCategoryRequest {
  name: string;
  isActive: boolean;
}

export const getAllCategories = async (): Promise<ICategoriesRes> => {
  const data = await api.get<IApiResponse<ICategory[]>>(`/categories`);
  return {
    categories: data.data,
    pagination: data.pagination,
  };
};

export const getCategoryById = async (
  categoryId?: number
): Promise<ICategoryRes> => {
  const data = await api.get<IApiResponse<ICategory>>(
    `/categories/${categoryId}`
  );
  return {
    category: data.data,
  };
};

export const createCategory = async (
  request: ICreateCategoryRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/categories`, request);
};

export const updateCategory = async (
  categoryId?: number,
  request?: IUpdateCategoryRequest
): Promise<void> => {
  await api.put<IApiResponse<void>>(`/categories/${categoryId}`, request);
};

export const deleteCategory = async (categoryId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/categories/${categoryId}`);
};
