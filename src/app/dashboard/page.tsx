import Table from "@/components/Table";
import { fetchProducts } from "@/services/product";
import { TProductType } from "@/types/product";

const DashboardPage = async () => {
  const data = await fetchProducts();
  return (
    <>
      <Table data={data} />
    </>
  );
};

export default DashboardPage;
