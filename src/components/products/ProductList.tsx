"use client";
import ProductListTable from "@/components/products/ProductListTable";
import ProductReviewModal from "@/components/products/ProductReviewModal";
import { TProductType } from "@/models/product";
import { useState } from "react";

const ParentComponent = ({ data }: { data: TProductType[] }) => {

  const [productReviewModal, setProductReviewModal] = useState({
    isShow: false,
    productId: 0,
  });

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

  return (
    <>
      <ProductListTable data={data} onOpenModal={handleOpenModal} />

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

export default ParentComponent;
