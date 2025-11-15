"use client";

import { DataTable } from "@/components/data-table";
import { getAllCustomers } from "@/service/admin/customer.service";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { customerColumns } from "./columns";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useMutateCustomer } from "@/stores/admin/useMutateCustomer";

const CustomerClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.customers.all(),
    queryFn: getAllCustomers,
  });

  const customers = data?.customers ?? [];

  const cols = customerColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setCustomerId(row.id);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setCustomerId(row.id);
    },
  });

  if (isFetching) {
    <LoadingOverlay isLoading={isFetching} />;
  }

  const { delete: deleteCustomerMutate } = useMutateCustomer();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteCustomerMutate(
      { customerId },
      {
        onSuccess: () => {
          setIsDelete(false);
          setCustomerId(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div>
      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Customer"
          description="This will remove the customer."
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={customers}
        initialPageSize={10}
        createLabel="Create"
        onCreateClick={() => {
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default CustomerClient;
