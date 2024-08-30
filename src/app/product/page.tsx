import Table from "@/components/Table";
import { fetchProducts } from "@/services/product";

const DashboardPage = async () => {
  const data = await fetchProducts();
  return <Table data={data} />;
};

export default DashboardPage;
