import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutComponent } from "../../components/organisme";
import { Meta } from "../../utils";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

export const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useState<any[]>([]);

  const metaData = {
    title: "Schedule -  Stock Opname App Ekatunggal",
    description: "Halaman schedule stock opname web system",
  };

  const navigate = useNavigate();
  const getSchedule = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULE).FIND({
        limit: 20,
        page: 1,
        fields: ["name", "user.name"],
        // filters: [
        //   ["name", "=", "SCH202302005"],
        //   ["name", "=", "SCH202302004"],
        // ],
        orderBy: { name: 1 },
      });
      setSchedule(result.data);
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
      alert(error.msg);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      {Meta(metaData)}
      <div className="w-full h-full overflow-y-auto">
        <div className=" w-full h-16   flex items-center justify-between">
          <h1 className="font-bold ml-5 text-[1.1em] mr-2 text-gray-700 ">
            Schedule List
          </h1>
          <div className="flex-1  flex items-center justify-end"></div>
        </div>
      </div>
    </>
  );
};
