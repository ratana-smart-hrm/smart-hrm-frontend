"use client";

import {
  createContractType,
  deleteContractType,
  ICreateContractTypeRequest,
  IUpdateContractTypeRequest,
  updateContractType,
} from "@/service/admin/contract-types.service";
import { contractTypeCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "ContractType";

export const useMutateContractType = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({
      request,
    }: {
      request: ICreateContractTypeRequest;
    }) => {
      return await createContractType(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      contractTypeCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      contractTypeId,
      request,
    }: {
      contractTypeId?: number;
      request?: IUpdateContractTypeRequest;
    }) => {
      return await updateContractType(contractTypeId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      contractTypeCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ contractTypeId }: { contractTypeId?: number }) => {
      return await deleteContractType(contractTypeId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      contractTypeCache.clearAll(queryClient);
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
