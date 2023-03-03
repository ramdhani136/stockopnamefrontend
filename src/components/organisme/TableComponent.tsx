import { IconButton } from "../atoms";
import {useState,useEffect} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from "react-spinners/SyncLoader";
import { IListIconButton } from "../atoms/IconButton";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import CloseIcon from "@mui/icons-material/Close";
import { FilterTableComponent } from "../moleculs";
import { IDataFilter } from "../moleculs/FilterTableComponent";
import { LocalStorageType } from "../../utils";

export interface IColumns {
  header: String;
  accessor: String;
}

export interface IDataTables {
  [key: string]: JSX.Element | String | number;
}

export interface IColumns {
  header: String;
  accessor: String;
}

interface Iprops {
  columns: IColumns[];
  data: IDataTables[];
  fetchMore(): Promise<any>;
  hasMore: boolean;
  total: number;
  sort: IListIconButton[];
  isSort: String;
  isOrderBy: number;
  setOrderBy(): void | Promise<void>;
  getAllData(): void | Promise<void>;
  listFilter: IDataFilter[];
  filter: any[];
  setFilter: any;
  localStorage?: LocalStorageType;
}

const TableComponent: React.FC<Iprops> = ({
  columns,
  data,
  fetchMore,
  hasMore,
  total,
  sort,
  isSort,
  isOrderBy,
  setOrderBy,
  getAllData,
  listFilter,
  filter,
  setFilter,
  localStorage,
}) => {
  const [tableData, setTableData] = useState<any[]>();

  return (
    <div
      className="w-[97.5%] border border-[#e6e7e9] flex-1 bg-white ml-[1.25%]  mb-3 rounded-md drop-shadow-md overflow-y-auto  scrollbar-thin scrollbar-thumb-[#ddd] scrollbar-track-gray-100"
      id="scrollableDiv"
    >
      <div className="h-auto">
        <div className="w-full p-3 sticky top-0 flex items-center justify-between py-5 border-b bg-white">
          <h5 className="text-[0.9em] ml-4 text-gray-600 font-semibold flex items-center">
            ({data.length} Of {total})
            <div className="w-64 border h-9 rounded-sm  ml-4 bg-gray-50 flex items-center relative">
              <input
                className=" flex-1  px-3 pr-8 h-full bg-gray-50 placeholder:text-gray-300 placeholder:font-normal"
                placeholder="Search"
              />
              <CloseIcon
                className="mr-[5px] text-gray-200 cursor-pointer absolute right-0"
                style={{ fontSize: 18 }}
              />
            </div>
            <FilterTableComponent
              filter={filter}
              setFilter={setFilter}
              listFilter={listFilter}
              localStorage={localStorage}
            />
          </h5>
          <div className="flex">
            <IconButton
              callback={getAllData}
              name="All Data"
              // list={list}
              // iconListDisabled
              className="py-1 px-2 mr-2 hover:bg-gray-100 duration-100"
              iconSize={17}
              primary
            />
            <IconButton
              callback={setOrderBy}
              Icon={isOrderBy === 1 ? NorthIcon : SouthIcon}
              className=" flex py-1 px-2 rounded-r-none  hover:bg-gray-100 duration-100"
              iconSize={13}
              primary
            />
            <IconButton
              name={isSort}
              list={sort}
              className="py-[4.8px] px-2 border-l-0 rounded-l-none hover:bg-gray-100 duration-200"
              iconSize={17}
              primary
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="w-auto  left-1/2 inline py-1 px-2 text-center relative bottom-14  text-sm text-gray-400">
              <SyncLoader
                color="#36d7b6"
                loading={true}
                // cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
          scrollableTarget="scrollableDiv"
          // endMessage={
          //   <div className="w-auto z-20  left-1/2 inline py-1 px-2 text-center relative bottom-2  text-sm text-gray-300 r">
          //     No more data
          //   </div>
          // }
        >
          <section className="w-95% p-4 h-auto overflow-x-auto">
            {data.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-normal text-gray-600 text-[0.95em] text-left pb-3 px-4">
                      <input
                        className="w-[14px] accent-slate-600"
                        type="checkbox"
                      />
                    </th>
                    {columns.map((col, index) => (
                      <th
                        key={index}
                        className="font-normal text-gray-500 text-[0.95em] text-left pb-3"
                      >
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, index) => (
                    <tr
                      key={index}
                      className="text-[0.9em] border-b border-[#f4f6f5] hover:bg-gray-50 cursor-pointer "
                    >
                      <td className="py-[15px] px-4">
                        <input
                          className="w-[14px] accent-slate-600"
                          type="checkbox"
                        />
                      </td>
                      {columns.map((col: IColumns, id) => (
                        <td key={id}>{item[`${col.accessor}`]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4 className="text-center mt-28 text-gray-400 font-normal">
                Data not found
              </h4>
            )}
          </section>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TableComponent;
