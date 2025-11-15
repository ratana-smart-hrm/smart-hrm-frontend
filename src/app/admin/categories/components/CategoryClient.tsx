"use client";

import { DataTable } from "@/components/data-table";
import { getAllCategories } from "@/service/admin/category.service";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { categoryColumns } from "./columns";
import CategoryDialog from "./CategoryDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useMutateCategory } from "@/stores/admin/useMutateCategory";

const CategoryClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: getAllCategories,
  });

  const categories = data?.categories ?? [];

  const cols = categoryColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setCategoryId(row.id);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setCategoryId(row.id);
    },
  });

  if (isFetching) {
    <LoadingOverlay isLoading={isFetching} />;
  }

  const { delete: deleteCategoryMutate } = useMutateCategory();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteCategoryMutate(
      { categoryId },
      {
        onSuccess: () => {
          setIsDelete(false);
          setCategoryId(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div>
      {isOpen && (
        <CategoryDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setCategoryId(undefined);
          }}
          categoryId={categoryId}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Category"
          description="This will remove the category."
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={categories}
        initialPageSize={10}
        createLabel="Create"
        onCreateClick={() => {
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default CategoryClient;
