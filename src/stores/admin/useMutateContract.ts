"use client";

import {
  createContract,
  deleteContract,
  ICreateContractRequest,
  IUpdateContractRequest,
  updateContract,
} from "@/service/admin/contracts.service";
import { contractCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Contract";

export const useMutateContract = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateContractRequest }) => {
      return await createContract(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      contractCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      contractId,
      request,
    }: {
      contractId?: number;
      request?: IUpdateContractRequest;
    }) => {
      return await updateContract(contractId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      contractCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ contractId }: { contractId?: number }) => {
      return await deleteContract(contractId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      contractCache.clearAll(queryClient);
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
