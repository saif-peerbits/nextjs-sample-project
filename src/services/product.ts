import axiosInstance from "@/lib/axiosConfig";

const fetchProductsList = async () => {
  try {
    const response = await axiosInstance.get("/products");

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export { fetchProductsList };
