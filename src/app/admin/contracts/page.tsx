import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSearchParams } from "@/utils/searchParams";
import {
  getAllContractTypeList,
  getAllContractTypes,
} from "@/service/admin/contract-types.service";
import ContractTypeClient from "./components/ContractClient";
import { getAllContracts } from "@/service/admin/contracts.service";

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
    queryKey: queryKeys.contracts.list(pageIndex, pageSize),
    queryFn: () => getAllContracts(pageIndex, pageSize),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.contractTypes.list(),
    queryFn: () => getAllContractTypeList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContractTypeClient initPageIndex={pageIndex} initPageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default page;
