"use server";

import { IApiResponse, IProduct, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface IProductsRes {
  products?: IProduct[];
  pagination?: IPagination;
}

export interface IProductRes {
  product?: IProduct;
}

export interface ICreateProductRes {
  id?: number;
}

export interface ICreateProductRequest {
  name?: string;
  categoryId?: number;
  description?: string;
  price?: number;
  quantity?: number;
  discountPercent?: string;
  colors?: {
    hexCode?: string;
  }[];
}

export interface IUpdateProductRequest {
  name?: string;
  categoryId?: number;
  description?: string;
  price?: number;
  quantity?: number;
  discountPercent?: string;
  colors?: {
    hexCode?: string;
  }[];
}

export const getAllProducts = async (): Promise<IProductsRes> => {
  const data = await api.get<IApiResponse<IProduct[]>>(`/products`);
  return {
    products: data.data,
    pagination: data.pagination,
  };
};

export const getProductById = async (
  productId?: number
): Promise<IProductRes> => {
  const data = await api.get<IApiResponse<IProduct>>(`/products/${productId}`);
  return {
    product: data.data,
  };
};

export const createProduct = async (
  request: ICreateProductRequest
): Promise<ICreateProductRes> => {
  const data = await api.post<IApiResponse<ICreateProductRes>>(`/products`, request);
  return {
    id: data.data.id
  }
};

export const updateProduct = async (
  productId?: number,
  request?: IUpdateProductRequest
): Promise<ICreateProductRes> => {
  const data = await api.put<IApiResponse<ICreateProductRes>>(`/products/${productId}`, request);
  return {
    id: data.data.id
  }
};

export const deleteProduct = async (productId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/products/${productId}`);
};
