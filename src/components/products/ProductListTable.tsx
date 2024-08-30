import { i18n } from "@/constant";
import { TProductType } from "@/models/product";
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
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const ProductListTable = ({
  productList,
  onOpenModal,
}: {
  productList: TProductType[];
  onOpenModal: (product: TProductType) => void;
}) => {
  const t = useTranslations(i18n.FRONTENDTEST);

  const columns = useMemo<ColumnDef<TProductType>[]>(
    () => [
      { accessorKey: "id", header: t("ID"), size: 60 },
      { accessorKey: "title", header: t("TITLE"), size: 150, minSize: 150 },
      {
        accessorKey: "description",
        header: t("DESCRIPTION"),
        size: 400,
        minSize: 400,
        maxSize: 500,
      },
      { accessorKey: "category", header: t("CATEGORY"), size: 120 },
      { accessorKey: "price", header: t("PRICE"), size: 100 },
      { accessorKey: "discountPercentage", header: t("DISCOUNT"), size: 100 },
      { accessorKey: "rating", header: t("RATING"), size: 80 },
      { accessorKey: "stock", header: t("STOCK"), size: 80 },
      {
        accessorKey: "brand",
        header: t("BRAND"),
        cell: ({ row }) => (row?.original?.brand ? row?.original?.brand : "-"),
        size: 150,
        minSize: 150,
      },
      {
        id: "actions",
        header: t("ACTIONS"),
        cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => onOpenModal(row.original)}
            sx={{ textTransform: "none" }}
          >
            {t("VIEW_REVIEWS")}
          </Button>
        ),
        size: 150,
        minSize: 150,
      },
    ],
    [onOpenModal, t] // Dependency array, only re-create columns if onOpenModal changes
  );

  const table = useReactTable({
    data: productList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                      header.column.columnDef.minSize ?? header.column.getSize()
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
  );
};

export default ProductListTable;
