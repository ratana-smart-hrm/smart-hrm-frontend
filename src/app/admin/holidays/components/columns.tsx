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
import { ICustomer, IDevice , IHoliday } from "@/types/admin";
import { createRowNumberColumn } from "@/components/data-table";

export const holidayColumns = (opts?: {
  onEdit?: (row: IHoliday) => void;
  onDelete?: (row: IHoliday) => void;
}): ColumnDef<IHoliday>[] => {
  const { onDelete } = opts ?? {};

  const cols: ColumnDef<IHoliday>[] = [
    createRowNumberColumn<IHoliday>(),
    {

      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
      
    },
    {

      header: "StartDate",
      cell: ({ row }) => <div>{row.original.startDate}</div>,
      
    },
    {

      header: "EndDate",
      cell: ({ row }) => <div>{row.original.endDate}</div>,
      
    },
    {

      header: "Type",
      cell: ({ row }) => <div>{row.original.type}</div>,
      
    },


    
    // {
    //   header: "Phone",
    //   cell: ({ row }) => (
    //     <div className="flex flex-col">
    //       <p>{row.original.phone}</p>
    //       <p className="text-sm text-muted-foreground">{row.original.email}</p>
    //     </div>
    //   ),
    // },

 
    {
      accessorKey: "createdAt",
      header: "Created",
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
