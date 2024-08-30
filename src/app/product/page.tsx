import Table from "@/components/Table";
import { fetchProducts } from "@/services/product.service";

const Product = async () => {
  const data = await fetchProducts();
  return <Table data={data} />;
};

export default Product;
