import CategoryClient from "./components/CategoryClient";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { getAllCategories } from "@/service/admin/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: getAllCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryClient />
    </HydrationBoundary>
  );
};

export default page;
