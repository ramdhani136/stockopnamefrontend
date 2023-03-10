import { useEffect, useState } from "react";
import { IDataFilter } from "../../components/moleculs/FilterTableComponent";
import { IDataTables } from "../../components/organisme/TableComponent";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

interface IProps {
  id: string;
}

const ListItemSchedule: React.FC<IProps> = ({ id }) => {
  const [data, setData] = useState<IDataTables[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [page, setPage] = useState<String>("1");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState<any[]>([]);
  const [isSort, setIsort] = useState<string>("createdAt");
  const [isOrderBy, setOrderBy] = useState<number>(-1);
  const [limit, setLimit] = useState<number>(20);
  const [listFilter, setListFilter] = useState<IDataFilter[]>([]);
  const [search, setSeacrh] = useState<String>("");
  const [filter, setFilter] = useState<any[]>([]);

  const getListData = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULEITEM).FIND({
        filters: [["schedule.name", "=", `${id}`]],
      });
      setData(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    getListData();
  }, []);

//   console.log(data);
  return <div>ListItemSchedule</div>;
};

export default ListItemSchedule;
