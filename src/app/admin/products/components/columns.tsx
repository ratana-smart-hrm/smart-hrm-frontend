"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { IProduct } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";
import Image from "next/image";
import { PercentIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const productColumns = (opts?: {
  onEdit?: (row: IProduct) => void;
  onDelete?: (row: IProduct) => void;
  onDetail?: (row: IProduct) => void;
}): ColumnDef<IProduct>[] => {
  const { onDelete, onEdit, onDetail } = opts ?? {};

  const cols: ColumnDef<IProduct>[] = [
    createRowNumberColumn<IProduct>(),
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
        const img = row.original.images?.[0];
        return img ? (
          <Image
            src={img.url ?? ""}
            alt={row.original.name ?? ""}
            width={48}
            height={48}
            className="rounded-md object-cover h-12 w-12"
          />
        ) : (
          <div className="h-12 w-12 rounded-md bg-gray-200" />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          {row.original.description && (
            <span
              className="block max-w-[220px] truncate text-xs text-muted-foreground"
              title={row.original.description}
            >
              {row.original.description}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => {
        const qty = row.original.quantity ?? 0;
        return (
          <span
            className={cn(
              "font-medium",
              qty <= 0 && "text-red-500",
              qty > 0 && "text-green-500"
            )}
          >
            {qty}
          </span>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div className="">$ {row.original.price}</div>,
    },
    {
      accessorKey: "discountPercent",
      header: "Discount",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.discountPercent}
          <PercentIcon className="h-3 w-3" />
        </div>
      ),
    },
    {
      id: "colors",
      header: "Colors",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.colors?.map((c) => (
            <span
              key={c.id}
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: c.hexCode }}
              title={c.hexCode}
            />
          )) || <span className="text-muted-foreground">—</span>}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category?.name ?? "-",
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.original.createdAt ?? "").toLocaleDateString(),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => onDetail?.(row.original)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit?.(row.original)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete?.(row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return cols;
};
