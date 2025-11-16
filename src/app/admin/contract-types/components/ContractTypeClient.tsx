"use client";

import { DataTable } from "@/components/data-table";
import { queryKeys } from "@/service/util/query-key";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { contractTypeColumns } from "./columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllContractTypes } from "@/service/admin/contract-types.service";
import ContractTypeDialog from "./ContractTypeDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useMutateContractType } from "@/stores/admin/useMutateContractType";
import { IContractType } from "@/types/admin";

interface Props {
  initPageIndex: number;
  initPageSize: number;
}
const ContractTypeClient = ({ initPageIndex, initPageSize }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  const [pageSize, setPageSize] = useState(initPageSize);

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [contractType, setContractType] = useState<IContractType | undefined>(
    undefined
  );

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.contractTypes.list(pageIndex, pageSize),
    queryFn: () => getAllContractTypes(pageIndex, pageSize),
  });

  const ContractTypes = data?.contractTypes ?? [];
  const pagination = data?.pagination;

  const cols = contractTypeColumns({
    onEdit: (row) => {
      setIsOpen(true);
      setContractType(row);
    },
    onDelete: (row) => {
      setIsDelete(true);
      setContractType(row);
    },
  });
  const { delete: deleteContractTypeMutate } = useMutateContractType();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteContractTypeMutate(
      { contractTypeId: contractType?.id },
      {
        onSuccess: () => {
          setIsDelete(false);
          setContractType(undefined);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const handlePaginationChange = ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    const params = new URLSearchParams(searchParams);
    params.set("pageIndex", String(pageIndex));
    params.set("pageSize", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <div>
      {isOpen && (
        <ContractTypeDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false);
            setContractType(undefined);
          }}
          contractTypeId={contractType?.id}
        />
      )}

      {isDelete && (
        <ConfirmDialog
          open={isDelete}
          onOpenChange={setIsDelete}
          title="Delete Category"
          description={`This will remove the ${contractType?.name}`}
          loading={isLoading}
          onConfirm={handleDelete}
        />
      )}

      <DataTable
        columns={cols}
        data={ContractTypes}
        serverMode={true}
        pageCount={pagination?.totalPages ?? 0}
        onPaginationChange={handlePaginationChange}
        initialPageIndex={pageIndex}
        initialPageSize={pageSize}
        createLabel="Create"
        onCreateClick={() => {
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default ContractTypeClient;
