"use client";
import Header from "@/components/layout/Header";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const ProductLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      <Box sx={{ height: "calc(100vh - 100px)" }}>{children}</Box>
    </>
  );
};

export default ProductLayout;
