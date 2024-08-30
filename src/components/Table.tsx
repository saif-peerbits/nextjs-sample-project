"use client";
import ProductReviewModal from "@/components/ProductReviewModal";
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
  const [productReviewModal, setProductReviewModal] = useState({
    isShow: false,
    productId: 0,
  });

  const columns: ColumnDef<TProductType>[] = [
    { accessorKey: "id", header: "ID", size: 60 },
    { accessorKey: "title", header: "Title", size: 150, minSize: 150 },
    {
      accessorKey: "description",
      header: "Description",
      size: 400,
      minSize: 400,
      maxSize: 500,
    },
    { accessorKey: "category", header: "Category", size: 120 },
    { accessorKey: "price", header: "Price", size: 100 },
    { accessorKey: "discountPercentage", header: "Discount", size: 100 },
    { accessorKey: "rating", header: "Rating", size: 80 },
    { accessorKey: "stock", header: "Stock", size: 80 },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => (row?.original?.brand ? row?.original?.brand : "-"),
      size: 150,
      minSize: 150,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="contained"
          onClick={() => handleOpenModal(row.original)}
          sx={{ textTransform: "none" }}
        >
          View Reviews
        </Button>
      ),
      size: 150,
      minSize: 150,
    },
  ];

  const handleOpenModal = (product: TProductType) => {
    setProductReviewModal({
      isShow: true,
      productId: product?.id,
    });
  };

  const handleCloseModal = () => {
    setProductReviewModal({
      isShow: false,
      productId: 0,
    });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      width: `${header.column.getSize()}px`,
                      minWidth: `${
                        header.column.columnDef.minSize ??
                        header.column.getSize()
                      }px`,
                      maxWidth: `${header.column.columnDef.maxSize ?? "auto"}`,
                    }}
                  >
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
                  <TableCell
                    key={cell.id}
                    sx={{
                      width: `${cell.column.getSize()}px`,
                      minWidth: `${
                        cell.column.columnDef.minSize ?? cell.column.getSize()
                      }px`,
                      maxWidth: `${cell.column.columnDef.maxSize ?? "auto"}`,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {productReviewModal?.isShow && (
        <ProductReviewModal
          open={productReviewModal?.isShow}
          handleClose={handleCloseModal}
          productId={productReviewModal?.productId}
        />
      )}
    </>
  );
};

export default MyTable;
