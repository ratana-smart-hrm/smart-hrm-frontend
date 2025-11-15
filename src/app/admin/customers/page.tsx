import CategoryClient from "./components/CustomerClient";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { getAllCategories } from "@/service/admin/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllCustomers } from "@/service/admin/customer.service";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.customers.all(),
    queryFn: getAllCustomers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryClient />
    </HydrationBoundary>
  );
};

export default page;
