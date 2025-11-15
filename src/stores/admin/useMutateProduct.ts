"use client";

import {
  createProduct,
  deleteProduct,
  ICreateProductRequest,
  IUpdateProductRequest,
  updateProduct,
} from "@/service/admin/product.service";
import { queryKeys } from "@/service/util/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Product";

export const useMutateProduct = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateProductRequest }) => {
      return await createProduct(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      productId,
      request,
    }: {
      productId?: number;
      request?: IUpdateProductRequest;
    }) => {
      return await updateProduct(productId, request);
    },
    onSuccess: (_, variables) => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.products.all() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.byId(variables.productId),
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ productId }: { productId?: number }) => {
      return await deleteProduct(productId);
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

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
  };
};
