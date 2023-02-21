import { LayoutComponent } from "../components/organisme";
import { Meta } from "../utils";

const HomePage: React.FC = () => {
  const metaData = {
    title: "Home -  Stock Opname App Ekatunggal",
    description: "Halaman utama stock opname web system",
  };
  return (
    <>
      {Meta(metaData)}
      <div className="w-[92%] bg-white  border border-gray-200 h-9 ml-20 mt-3">fddd</div>
    </>
  );
};

export default HomePage;
