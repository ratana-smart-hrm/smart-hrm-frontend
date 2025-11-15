import CategoryClient from "./components/ProductClient";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllProducts } from "@/service/admin/product.service";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.all(),
    queryFn: getAllProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryClient />
    </HydrationBoundary>
  );
};

export default page;
