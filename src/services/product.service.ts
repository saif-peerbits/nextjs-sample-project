import axiosInstance from "@/config/axios.config";
import { TApiResponse } from "@/models/axios";
import { TProductType } from "@/models/product";

/**
 * fetch product list api
 * @returns 
 */
const fetchProductsListApi = (): TApiResponse<{ products: TProductType[] }> => {
  return axiosInstance.get("/products");
}

/**
 * fetch product detail api
 * @param productId 
 * @returns 
 */
const fetchProductDetailApi = (productId: number): TApiResponse<TProductType> => {
  return axiosInstance.get(`/products/${productId}`);
}

export { fetchProductDetailApi, fetchProductsListApi };
