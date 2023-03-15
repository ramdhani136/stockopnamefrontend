import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { IDataFilter } from "../../components/moleculs/FilterTableComponent";
import TableComponent, {
  IColumns,
  IDataTables,
} from "../../components/organisme/TableComponent";
import { FilterKata } from "../../utils";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

interface IProps {
  id: string;
}

const ListItemSchedule: React.FC<IProps> = ({ id }) => {
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
    (): IColumns[] => [
      { header: "Item Code", accessor: "item_code", className: "w-[20%]" },
      { header: "Item Name", accessor: "item_name", className: "w-[32.5%]" },
      { header: "Stocker", accessor: "stocker", className: "w-[10%]" },
      { header: "stock", accessor: "actual_qty", className: "w-[7.5%]" },
      { header: "Actual", accessor: "real_qty", className: "w-[7.5%]" },
      { header: "Uom", accessor: "uom", className: "w-[7.5%]" },
      { header: "", accessor: "updatedAt", className: "w-[10%]" },
    ],
    []
  );

  const getData = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULEITEM).FIND({
        filters: [...filter, ["schedule.name", "=", `${id}`]],
        limit: limit,
        page: page,
        orderBy: { sort: isOrderBy, state: isSort },
        search: search,
      });
      if (result.data.length > 0) {
        const generateData = result.data.map((item: any): IDataTables => {
          return {
            id: item._id,
            checked: false,
            item_code: (
              <div
                onClick={() => {
                  console.log(
                    FilterKata({ filter: [".", "/"], kata: item.item_code })
                  );
                }}
              >
                {item.item_code}
              </div>
            ),
            item_name: (
              <a href={`/schedule/${id}/${item.item_code}`}>{item.item_name}</a>
            ),
            stocker: <div className="text-center">{item.stocker}</div>,
            uom: <div className="text-center">{item.stock_uom}</div>,
            actual_qty: (
              <div className="text-center font-medium text-[0.96em]">
                {item.actual_qty.toLocaleString()}
              </div>
            ),
            real_qty: (
              <div className="text-center font-medium text-[0.96em]">
                {item.real_qty.toLocaleString()}
              </div>
            ),
            updatedAt: (
              <div className="inline text-gray-600 text-[0.93em]">
                <h5 className="mr-2 inline">-</h5>
                <h5 className="inline">
                  {moment(`${item.updatedAt}`).fromNow()}
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
        setHasMore(result.hasMore);
        setPage(result.nextPage);
        setData([...data, ...generateData]);
      }
      setRefresh(false);
      setLoading(false);
    } catch (error) {
      setTotalData(0);
      setLoading(false);
      setRefresh(false);
    }
  };

  const getAllData = () => {
    setData([]);
    setHasMore(false);
    setPage(1);
    setLimit(0);
    setLoading(true);
    setRefresh(true);
  };

  const onRefresh = () => {
    setData([]);
    setPage(1), setHasMore(false);
    setRefresh(true);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (refresh) {
      getData();
    }
  }, [refresh]);

  useEffect(() => {
    onRefresh();
  }, [filter, search]);

  return (
    <div className="min-h-[300px] max-h-[400px] flex">
      {loading ? (
        <div className="w-full  flex items-center justify-center">
          <HashLoader
            color="#36d7b6"
            loading={true}
            // cssOverride={override}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
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
          getAllData={getAllData}
          filter={filter}
          setFilter={setFilter}
          className="ml-[3px]"
          onRefresh={() => {
            setData([]);
            setPage(1), setHasMore(false);
            setLoading(true);
            setRefresh(true);
          }}
        />
      )}
    </div>
  );
};

export default React.memo(ListItemSchedule);
