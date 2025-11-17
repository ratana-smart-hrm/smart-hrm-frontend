import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSearchParams } from "@/utils/searchParams";
import LeaveTypeClient from "./components/EmployeeClient";
import { getAllEmployees } from "@/service/admin/employees.service";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const queryClient = getQueryClient();
  const { pageIndex, pageSize } = getSearchParams(await searchParams);

  await queryClient.prefetchQuery({
    queryKey: queryKeys.employees.list(pageIndex, pageSize),
    queryFn: () => getAllEmployees(pageIndex, pageSize),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LeaveTypeClient initPageIndex={pageIndex} initPageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default page;
