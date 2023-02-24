import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonStatusComponent, IconButton } from "../../components/atoms";
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
import moment from "moment";

export const SchedulePage: React.FC = (): any => {
  const [data, setData] = useState<IDataTables[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [page, setPage] = useState<String>("1");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState<any[]>([]);
  const [isSort, setIsort] = useState<string>("createdAt");
  const [isOrderBy, setOrderBy] = useState<number>(-1);

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
      { header: "Due Date", accessor: "dueDate" },
      { header: "Warehouse", accessor: "warehouse" },
    ],
    []
  );

  const getData = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULE).FIND({
        limit: 20,
        page: page,
        // fields: ["name", "user.name"],
        // filters: [
        //   ["name", "=", "SCH202302005"],
        //   ["name", "=", "SCH202302004"],
        // ],
        orderBy: { sort: isOrderBy, state: isSort },
      });

      if (result.data.length > 0) {
        const generateData = result.data.map((item: any): IDataTables => {
          return {
            name: <b className="font-medium">{item.name}</b>,
            user: <div>{item.user.name}</div>,
            startDate: moment(item.startDate).format("LL"),
            dueDate: moment(item.dueDate).format("LL"),
            workflowState: (
              <ButtonStatusComponent
                status={item.status}
                name={item.workflowState}
              />
            ),
            warehouse: item.warehouse,
          };
        });

        const genSort: any[] = result.filters.map((st: any): any => {
          return {
            name: st.name,
            onClick: () => {
              setData([]);
              setHasMore(false);
              setPage("1");
              setIsort(st.name);
              setRefresh(true);
            },
          };
        });

        setSort(genSort);
        setTotalData(result.total);
        setHasMore(result.hasMore);
        setPage(result.nextPage);
        setData([...data, ...generateData]);
        setRefresh(false);
      }
      setLoading(false);
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
      alert(error);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setData([]);
    setPage("1"), setHasMore(false);
    setRefresh(true);
    setLoading(true);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (refresh) {
      getData();
    }
  }, [refresh]);

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
                  callback={onRefresh}
                  // name="Actions"
                  // list={list}
                  // iconListDisabled
                  primary
                  iconSize={20}
                  className="mr-2 cursor-pointer py-[4.5px] opacity-70 hover:opacity-100 duration-100 "
                />
                <IconButton
                  Icon={AddIcon}
                  name="Add Schedule"
                  className="opacity-80 hover:opacity-100 duration-100"
                  // list={list}
                  // iconListDisabled
                  // iconSize={20}
                />
              </div>
            </div>
            <TableComponent
              hasMore={hasMore}
              fetchMore={getData}
              columns={columns}
              data={data}
              total={totalData}
              sort={sort}
              isSort={isSort}
              isOrderBy={isOrderBy}
              setOrderBy={() => {
                setData([]);
                setHasMore(false);
                setPage("1");
                let getOrder = isOrderBy === 1 ? -1 : 1;
                setOrderBy(getOrder);
                setRefresh(true);
              }}
            />
          </>
        ) : (
          <LoadingComponent />
        )}
      </div>
    </>
  );
};
