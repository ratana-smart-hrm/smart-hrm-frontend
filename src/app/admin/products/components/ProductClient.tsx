"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { productColumns } from "./columns";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { getAllProducts } from "@/service/admin/product.service";
import { useMutateProduct } from "@/stores/admin/useMutateProduct";
import { ProductDetail } from "./ProductDetail";
import { IProduct } from "@/types/admin";
import { useRouter } from "next/navigation";

const ProductClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined
  );

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.products.all(),
    queryFn: getAllProducts,
  });

  const products = data?.products ?? [];

  const cols = productColumns({
    onDetail: (row) => {
      setIsProductOpen(true);
      setProductId(row.id)
    },
    onEdit: (row) => {
      router.push(`/admin/products/${row.id}`);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setProductId(row.id);
    },
  });

  if (isFetching) {
    <LoadingOverlay isLoading={isFetching} />;
  }

  const { delete: deleteProductMutate } = useMutateProduct();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteProductMutate(
      { productId },
      {
        onSuccess: () => {
          setIsDelete(false);
          setProductId(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div>
      <ProductDetail
        open={isProductOpen}
        onOpenChange={setIsProductOpen}
        productId={productId}
      />

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Product"
          description="This will remove the product."
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={products}
        initialPageSize={10}
        createLabel="Create"
        onCreateClick={() => {
          router.push("/admin/products/new");
        }}
      />
    </div>
  );
};

export default ProductClient;
