import axiosInstance from "@/lib/axiosConfig";

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    console.log(response.data);

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
