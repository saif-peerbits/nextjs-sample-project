import ProductList from "@/components/products/ProductList";
import { fetchProductsListApi } from "@/services/product.service";

const Product = async () => {
  const data = await fetchProductsListApi();
  return <ProductList data={data?.data?.products} />;
};

export default Product;
