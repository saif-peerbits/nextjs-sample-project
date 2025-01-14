import ProductList from "@/components/products/ProductList";
import { fetchProductsListApi } from "@/services/product";

const Product = async () => {
  const data = await fetchProductsListApi();
  return <ProductList productList={data?.data?.products} />;
};

export default Product;
