import Table from "@/components/Table";
import { fetchProductsList } from "@/services/product.service";

const Product = async () => {
  const data = await fetchProductsList();
  return <Table data={data} />;
};

export default Product;
