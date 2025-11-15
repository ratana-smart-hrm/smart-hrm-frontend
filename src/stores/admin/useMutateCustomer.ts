"use client";

import {
  createCustomer,
  deleteCustomer,
  ICreateCustomerRequest,
  IUpdateCustomerRequest,
  updateCustomer,
} from "@/service/admin/customer.service";
import { queryKeys } from "@/service/util/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Customer";

export const useMutateCustomer = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateCustomerRequest }) => {
      return await createCustomer(request);
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
      customerId,
      request,
    }: {
      customerId?: number;
      request?: IUpdateCustomerRequest;
    }) => {
      return await updateCustomer(customerId, request);
    },
    onSuccess: (_, variables) => {
      toast.success(`${RESOURCE} updated successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(variables.customerId),
      });
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ customerId }: { customerId?: number }) => {
      return await deleteCustomer(customerId);
    },
    onSuccess: (_, { customerId }) => {
      toast.success(`${RESOURCE} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories.byId(customerId),
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
