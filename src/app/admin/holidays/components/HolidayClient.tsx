"use client";

import { DataTable } from "@/components/data-table";
import { getAllCustomers } from "@/service/admin/customer.service";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useMutateCustomer } from "@/stores/admin/useMutateCustomer";
import { getAllDevices, getAllHolidays,  } from "@/service/admin/device.service";
import { holidayColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const HolidayClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.holidays.all(pageIndex, pageSize),
    queryFn: () => getAllHolidays(pageIndex, pageSize),
  });

  const holidays = data?.holidays ?? [];
  const pagination = data?.pagination 

  const cols = holidayColumns({
    onEdit: (row) => {},
    onDelete: (row) => {},
  });
  const handlePaginationChange = ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageIndex", String(pageIndex));
    params.set("pageSize", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isFetching) {
    <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <div>
      <DataTable
        columns={cols}
        data={holidays}
         pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageSize={pageSize}

        createLabel="Create"
        onCreateClick={() => {}}
      />
    </div>
  );
};



export default HolidayClient;

