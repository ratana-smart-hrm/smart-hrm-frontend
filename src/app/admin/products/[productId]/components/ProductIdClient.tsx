"use client";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { useRef, useState } from "react";
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { getProductById } from "@/service/admin/product.service";
import { getAllCategories } from "@/service/admin/category.service";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import Heading from "@/components/Heading";

interface Props {
  productId?: string;
}
const ProductIdClient = ({ productId }: Props) => {
  const [isloading, setIsLoading] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.products.byId(Number(productId)),
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId && productId !== "new",
  });

  const { data: dataCategories, isFetching: isCategoryFetching } = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => getAllCategories(),
  });

  const product = data?.product ?? null;
  const categories = dataCategories?.categories ?? [];

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: String(cat.id),
  }));

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSave = async () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  if (isFetching || isCategoryFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Product"
          description="Product details"
          backButtonHref="/admin/products"
        />
        <div className="flex justify-center items-center">
          <Button onClick={onSave}>
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </div>
      <Separator />
      <ProductForm
        categoryOptions={categoryOptions}
        formRef={formRef}
        setIsLoading={setIsLoading}
        initialize={product}
      />
    </>
  );
};

export default ProductIdClient;
