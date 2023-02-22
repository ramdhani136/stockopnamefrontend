import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../components/atoms";
import { Meta } from "../../utils";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

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

  const refresh = () => {
    alert("tes");
  };

  const list = [
    { name: "Request SPV", onClick: () => alert("dd") },
    { name: "Reject", onClick: () => alert("reject") },
  ];

  return (
    <>
      {Meta(metaData)}
      <div className="w-full h-full overflow-y-auto flex flex-col">
        <div className=" w-full h-16 flex items-center justify-between">
          <h1 className="font-bold ml-5 text-[1.1em] mr-2 text-gray-700 ">
            Schedule List
          </h1>
          <div className="flex-1  flex items-center justify-end mr-4">
            <IconButton
              Icon={RefreshIcon}
              callback={refresh}
              // name="Actions"
              // list={list}
              // iconListDisabled
              primary
              iconSize={20}
              className="mr-2 cursor-pointer py-[4.5px] "
            />
            <IconButton
              Icon={AddIcon}
              callback={refresh}
              name="Add Schedule"
              // list={list}
              // iconListDisabled
              // iconSize={20}
            />
          </div>
        </div>
        <div className="w-[97%] border flex-1 bg-white ml-[1.5%]  mb-5 rounded-md drop-shadow-md overflow-y-auto ">
          <div className="h-[1000px]">
            <div className="w-full p-3 sticky top-0 flex items-center justify-end py-5 border-b">
              <IconButton
                Icon={FilterListIcon}
                callback={refresh}
                name="Filter"
                // list={list}
                // iconListDisabled
                className="py-1 px-2 mr-2"
                iconSize={17}
                primary
              />
              <IconButton
                Icon={SortByAlphaIcon}
                callback={refresh}
                // name="Filter"
                // list={list}
                // iconListDisabled
                className="py-1 px-2 rounded-r-none"
                iconSize={22}
                primary
              />
              <IconButton
                callback={refresh}
                name="Create On"
                list={list}
                // iconListDisabled
                className="py-[4.8px] px-2 border-l-0 rounded-l-none"
                iconSize={17}
                primary
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
