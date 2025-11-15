"use client";

import {
  IRemoveBulk,
  removeBulkImageIds,
  removeImagesByProductId,
  uploadMultipleProductImages,
} from "@/service/admin/product-image.service";
import { queryKeys } from "@/service/util/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Product image";

export const useMutateProductImage = () => {
  const queryClient = useQueryClient();

  const uploadMultipleImagesMutation = useMutation({
    mutationFn: async ({
      productId,
      formData,
    }: {
      productId: number;
      formData: FormData;
    }) => {
      return await uploadMultipleProductImages(productId, formData);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} uploaded successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: () => {
      toast.error(`Failed to upload ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteBulkMutation = useMutation({
    mutationFn: async ({
      productId,
      request,
    }: {
      productId?: number;
      request: IRemoveBulk;
    }) => {
      return await removeBulkImageIds(request);
    },
    onSuccess: (_, { productId }) => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.byId(productId),
      });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ imageId }: { imageId?: number }) => {
      return await removeImagesByProductId(imageId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: () => {
      toast.error(`Failed to delete ${RESOURCE.toLowerCase()}`);
    },
  });

  return {
    uploadMultiple: uploadMultipleImagesMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    deleteBulk: deleteBulkMutation.mutateAsync,
  };
};
