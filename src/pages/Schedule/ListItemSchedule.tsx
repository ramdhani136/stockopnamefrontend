import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonStatusComponent } from "../../components/atoms";
import { IDataFilter } from "../../components/moleculs/FilterTableComponent";
import TableComponent, {
  IColumns,
  IDataTables,
} from "../../components/organisme/TableComponent";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

interface IProps {
  id: string;
}

const ListItemSchedule: React.FC<IProps> = ({ id }) => {
  console.log("refresh");
  const [data, setData] = useState<IDataTables[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState<any[]>([]);
  const [isSort, setIsort] = useState<string>("createdAt");
  const [isOrderBy, setOrderBy] = useState<number>(-1);
  const [limit, setLimit] = useState<number>(20);
  const [listFilter, setListFilter] = useState<IDataFilter[]>([]);
  const [search, setSeacrh] = useState<String>("");
  const [filter, setFilter] = useState<any[]>([]);

  const navigate = useNavigate();

  const columns: IColumns[] = useMemo(
    () => [
      { header: "Item Code", accessor: "item_code" },
      { header: "Item Name", accessor: "item_name" },
      { header: "Stocker", accessor: "stocker" },
      { header: "Uom", accessor: "uom" },
      { header: "Actual Qty", accessor: "actual_qty" },
      { header: "Real Qty", accessor: "real_qty" },
      { header: "", accessor: "updatedAt" },
    ],
    []
  );

  const getData = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULEITEM).FIND({
        filters: [["schedule.name", "=", `${id}`]],
      });
      if (result.data.length > 0) {
        const generateData = result.data.map((item: any): IDataTables => {
          return {
            id: item._id,
            checked: false,
            item_code: <div>{item.item_code}</div>,
            item_name: (
              <a href={`/schedule/${item.item_name}`}>{item.item_name}</a>
            ),
            stocker: <div className="text-center">{item.stocker}</div>,
            uom: <div className="text-center">{item.stock_uom}</div>,
            actual_qty: (
              <div className="text-center font-medium text-[0.96em]">
                {item.actual_qty}
              </div>
            ),
            real_qty: (
              <div className="text-center font-medium text-[0.96em]">
                {item.real_qty}
              </div>
            ),
            updatedAt: (
              <div className="inline text-gray-600 text-[0.93em]">
                <h5 className="mr-2 inline">-</h5>
                <h5 className="inline">
                  {moment(`${item.updatedAt}`).endOf("day").fromNow()}
                </h5>
              </div>
            ),
          };
        });

        const genSort: any[] = result.filters.map((st: any): any => {
          return {
            name: st.name,
            onClick: () => {
              setData([]);
              setHasMore(false);
              setPage(1);
              setIsort(st.name);
              setRefresh(true);
            },
          };
        });
        setListFilter(result.filters);
        setSort(genSort);
        setTotalData(result.total);
        // setHasMore(result.hasMore);
        setPage(result.nextPage);
        setData([...data, ...generateData]);
      }
      setRefresh(false);
    } catch (error) {
      setTotalData(0);
      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return (
    <div>
      <TableComponent
        setSearch={setSeacrh}
        setData={setData}
        listFilter={listFilter}
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
          setPage(1);
          let getOrder = isOrderBy === 1 ? -1 : 1;
          setOrderBy(getOrder);
          setRefresh(true);
        }}
        getAllData={() => alert("d")}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default React.memo(ListItemSchedule);
