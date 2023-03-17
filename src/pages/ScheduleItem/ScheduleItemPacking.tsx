import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
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

interface IDateProps {
  date: String;
}

const ScheduleItemPacking: React.FC<IProps> = ({ id }) => {
  // Info Date COmponent
  const InfoDateComponent: React.FC<IDateProps> = ({ date }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
      <div
        className={`inline text-gray-600 text-[0.93em]  `}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <h5 className="mr-2 inline">-</h5>
        <h5 className="inline ">{moment(`${date}`).fromNow()}</h5>
        <h6
          className={`${
            !open && "hidden"
          } duration-300 absolute -ml-3 -mt-12 text-white border text-center w-[150px] rounded-md py-1 px-2 bg-gray-900`}
        >
          {moment(`${date}`).format("lll")}
        </h6>
      </div>
    );
  };

  // End

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
      { header: "Item Packing", accessor: "id_packing", className: "w-[20%]" },
      { header: "Status", accessor: "status", className: "w-[10%]" },
      { header: "Packing Qty", accessor: "conversion", className: "w-[10%]" },
      { header: "Real Qty", accessor: "actual_qty", className: "w-[10%]" },
      { header: "UOM", accessor: "stock_uom", className: "w-[10%]" },
      { header: "Checked By", accessor: "checkedBy", className: "w-[15%]" },
      { header: "", accessor: "updatedAt", className: "w-[15%]" },
    ],
    []
  );

  const getData = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.PACKING).FIND({
        filters: [...filter, ["schedule.scheduleItem", "=", `${id}`]],
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
            id_packing: (
              <a href={`/schedule/${id}/${item._id}`}>{item.id_packing}</a>
            ),
            stock_uom: <div className="text-center">{item.stock_uom}</div>,
            status: (
              <ButtonStatusComponent
                status={item.status}
                name={item.status == 0 ? "Not Match" : "Match"}
              />
            ),
            conversion: (
              <div className="text-center font-medium text-[0.96em]">
                {item.conversion.toLocaleString()}
              </div>
            ),
            actual_qty: (
              <div className="text-center font-medium text-[0.96em]">
                {item.actual_qty.toLocaleString()}
              </div>
            ),
            checkedBy: (
              <div className=" font-medium text-[0.96em]">
                {item.checkedBy.name}
              </div>
            ),
            updatedAt: (
              <>
                <InfoDateComponent date={item.createdAt} />
              </>
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

export default React.memo(ScheduleItemPacking);
