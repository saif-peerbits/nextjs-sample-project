"use client";
import React from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TProductType } from "@/types/product";

const columnHelper = createColumnHelper<TProductType>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("category", {
    header: () => "Category",
    cell: (info) => info.getValue(),
  }),
];

const MyTable = ({ data }: { data: TProductType[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;
