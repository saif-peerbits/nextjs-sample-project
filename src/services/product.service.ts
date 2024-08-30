import axiosInstance from "@/config/axios.config";
import { PRODUCT_BASE_URI } from "@/endpoints/endpoints";
import { TApiResponse } from "@/models/axios";
import { TProductType } from "@/models/product";

/**
 * fetch product list api
 * @returns
 */
const fetchProductsListApi = (): TApiResponse<{ products: TProductType[] }> => {
  return axiosInstance.get(PRODUCT_BASE_URI);
};

/**
 * fetch product detail api
 * @param productId
 * @returns
 */
const fetchProductDetailApi = (
  productId: number
): TApiResponse<TProductType> => {
  return axiosInstance.get(`${PRODUCT_BASE_URI}/${productId}`);
};

export { fetchProductDetailApi, fetchProductsListApi };
