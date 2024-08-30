import Table from "@/components/Table";
import { fetchProductsListApi } from "@/services/product.service";

const Product = async () => {

  const data = await fetchProductsListApi();

  return <Table data={data?.data?.products} />;
};

export default Product;
