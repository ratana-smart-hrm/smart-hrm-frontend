"use client";

import {
  createEmployee,
  deleteEmployee,
  ICreateEmployeeRequest,
  IUpdateEmployeeRequest,
  updateEmployee,
} from "@/service/admin/employees.service";
import { employeeCache } from "@/service/util/query-cache";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RESOURCE = "Employee";

export const useMutateEmployee = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ request }: { request: ICreateEmployeeRequest }) => {
      return await createEmployee(request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} created successfully`);

      employeeCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to create ${RESOURCE.toLowerCase()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      employeeId,
      request,
    }: {
      employeeId?: number;
      request?: IUpdateEmployeeRequest;
    }) => {
      return await updateEmployee(employeeId, request);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} updated successfully`);

      employeeCache.clearAll(queryClient);
    },
    onError: () => {
      toast.error(`Failed to update ${RESOURCE.toLowerCase()}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ employeeId }: { employeeId?: number }) => {
      return await deleteEmployee(employeeId);
    },
    onSuccess: () => {
      toast.success(`${RESOURCE} deleted successfully`);

      employeeCache.clearAll(queryClient);
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
