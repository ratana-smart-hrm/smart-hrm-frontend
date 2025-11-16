"use client";

import { DataTable } from "@/components/data-table";
import { getAllCustomers } from "@/service/admin/customer.service";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useMutateCustomer } from "@/stores/admin/useMutateCustomer";
import { getAllDevices } from "@/service/admin/device.service";
import { deviceColumns } from "./columns";

const DeviceClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.devices.all(),
    queryFn: ()=> getAllDevices(),
  });

  const devices = data?.devices ?? [];

  const cols = deviceColumns({
    onEdit: (row) => {
    },
    onDelete: (row) => {
    },
  });

  if (isFetching) {
    <LoadingOverlay isLoading={isFetching} />;
  }


  return (
    <div>


      <DataTable
        columns={cols}
        data={devices}
        initialPageSize={10}
        createLabel="Create"
        onCreateClick={() => {
        
        }}
      />
    </div>
  );
};

export default DeviceClient;
