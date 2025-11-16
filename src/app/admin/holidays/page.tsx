import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { getAllCategories } from "@/service/admin/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllCustomers } from "@/service/admin/customer.service";
import { getAllDevices, getAllHolidays } from "@/service/admin/device.service";
import HolidayClient from "./components/HolidayClient";
import { getSearchParams } from "@/utils/searchParams";

interface Props {
  searchParams: Promise<{
    pageIndex?: string;
    pageSize?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const queryClient = getQueryClient();
const {pageIndex, pageSize} = getSearchParams(await searchParams)

  await queryClient.prefetchQuery({
    queryKey: queryKeys.holidays.all(pageIndex, pageSize),
    queryFn: () => getAllHolidays(pageIndex, pageSize),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HolidayClient initPageIndex={pageIndex} initPageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default page;
