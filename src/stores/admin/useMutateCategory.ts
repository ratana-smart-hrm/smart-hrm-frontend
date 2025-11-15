"use client";

import {
  createCategory,
  deleteCategory,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
  updateCategory,
} from "@/service/admin/category.service";
import { queryKeys } from "@/service/util/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Category";

export const useMutateCategory = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateCategoryRequest }) => {
      return await createCategory(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      categoryId,
      request,
    }: {
      categoryId?: number;
      request?: IUpdateCategoryRequest;
    }) => {
      return await updateCategory(categoryId, request);
    },
    onSuccess: (_, variables) => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(variables.categoryId),
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ categoryId }: { categoryId?: number }) => {
      return await deleteCategory(categoryId);
    },
    onSuccess: (_, { categoryId }) => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(categoryId),
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
