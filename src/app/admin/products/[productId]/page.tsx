import ProductIdClient from "./components/ProductIdClient";
import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { getProductById } from "@/service/admin/product.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllCategories } from "@/service/admin/category.service";

interface Props {
  params?: Promise<{ productId?: string }>;
}
const page = async ({ params }: Props) => {
  const productId = (await params)?.productId ?? "";
  const queryClient = getQueryClient();

  if (productId && productId !== "new") {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.products.byId(Number(productId)),
      queryFn: () => getProductById(Number(productId)),
    });
  }

  await queryClient.prefetchQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => getAllCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductIdClient productId={productId} />
    </HydrationBoundary>
  );
};

export default page;
