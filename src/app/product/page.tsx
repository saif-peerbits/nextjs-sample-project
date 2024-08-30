import Table from "@/components/Table";
import { fetchProductsList } from "@/services/product";

const DashboardPage = async () => {
  const data = await fetchProductsList();
  return <Table data={data} />;
};

export default DashboardPage;
