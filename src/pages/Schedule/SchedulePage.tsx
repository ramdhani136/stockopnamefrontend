import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../components/atoms";
import { Meta } from "../../utils";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { TableComponent } from "../../components/organisme";
import {
  IColumns,
  IDataTables,
} from "../../components/organisme/TableComponent";
import { LoadingComponent } from "../../components/moleculs";

export const SchedulePage: React.FC = (): any => {
  const [data, setData] = useState<IDataTables[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const metaData = {
    title: "Schedule -  Stock Opname App Ekatunggal",
    description: "Halaman schedule stock opname web system",
  };

  const navigate = useNavigate();

  const columns: IColumns[] = useMemo(
    () => [
      { header: "Name", accessor: "name" },
      { header: "Workflow State", accessor: "workflowState" },
      { header: "User", accessor: "user" },
      { header: "Start Date", accessor: "startDate" },
      { header: "Closing Date", accessor: "dueDate" },
      // { header: "Warehouse", accessor: "warehouse" },
    ],
    []
  );

  const getData = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULE).FIND({
        limit: 20,
        page: 1,
        // fields: ["name", "user.name"],
        // filters: [
        //   ["name", "=", "SCH202302005"],
        //   ["name", "=", "SCH202302004"],
        // ],
        orderBy: { name: 1 },
      });
      if (result.data.length > 0) {
        const generateData = result.data.map((item: any): IDataTables => {
          return {
            name: <b className="font-medium">{item.name}</b>,
            user: <div>{item.user.name}</div>,
            startDate: <div>{item.startDate}</div>,
            dueDate: <div>{item.dueDate}</div>,
            workflowState: <div>{item.workflowState}</div>,
          };
        });
        setData(generateData);
      }
      setLoading(false);
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
      alert(error.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refresh = () => {
    alert("tes");
  };

  return (
    <>
      {Meta(metaData)}

      <div className="w-full h-full overflow-y-auto flex flex-col">
        {!loading ? (
          <>
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
            <TableComponent columns={columns} data={data} />
          </>
        ) : (
          <LoadingComponent />
        )}
      </div>
    </>
  );
};
