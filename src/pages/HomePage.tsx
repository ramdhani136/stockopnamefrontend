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
      <div className="w-full h-full overflow-y-auto">
        <div className="h-[1000px] bg-white"></div>
      </div>
    </>
  );
};

export default HomePage;
