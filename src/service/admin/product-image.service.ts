"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";

export interface IRemoveBulk {
  ids?: number[];
}
export const uploadMultipleProductImages = async (
  productId: number,
  formData: FormData
): Promise<void> => {
  await api.post<IApiResponse<void>>(
    `/product-images/upload-multiple/${productId}`,
    formData
  );
};

export const removeImagesByProductId = async (
  productId?: number
): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/product-images/product/${productId}`);
};

export const removeByImageId = async (imageId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/product-images/${imageId}`);
};

export const removeBulkImageIds = async (request?: IRemoveBulk): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/product-images/bulk`, request);
};
