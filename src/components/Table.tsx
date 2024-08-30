"use client";
import { TProductType } from "@/types/product";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const MyTable = ({ data }: { data: TProductType[] }) => {
  const [open, setOpen] = useState(false);

  const columns: ColumnDef<TProductType>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "discountPercentage", header: "Discount" },
    { accessorKey: "rating", header: "Rating" },
    { accessorKey: "stock", header: "Stock" },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => (row?.original?.brand ? row?.original?.brand : "-"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="contained"
          onClick={() => handleOpen(row.original)}
          sx={{ textTransform: "none" }}
        >
          View Reviews
        </Button>
      ),
    },
  ];

  const handleOpen = (product: TProductType) => {
    // const res = await fetch(`https://dummyjson.com/products/${product.id}`);
    // const data = await res.json();
    // setSelectedProduct(data);
    // setOpen(true);

    console.log(product);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "100vh" }}>
      <Table stickyHeader>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
