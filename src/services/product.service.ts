import axiosInstance from "@/config/axios.config";
import { PRODUCT_BASE_URI } from "@/endpoints/endpoints";

const fetchProductsList = async () => {
  try {
    const response = await axiosInstance.get(PRODUCT_BASE_URI);

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export { fetchProductsList };
