import axiosInstance from "@/config/axios.config";

/**
 * fetch product list api
 * @returns Promise
 */
const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export { fetchProducts }
