import { useState, useEffect } from "react";
import { IconButton } from "../atoms";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

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
}

const TableComponent: React.FC<Iprops> = ({ columns, data }) => {
  const list = [
    { name: "Request SPV", onClick: () => alert("dd") },
    { name: "Reject", onClick: () => alert("reject") },
  ];

  return (
    <div className="w-[97.5%] border flex-1 bg-white ml-[1.25%]  mb-3 rounded-md drop-shadow-md overflow-y-auto ">
      <div className="h-auto">
        <div className="w-full p-3 sticky top-0 flex items-center justify-end py-5 border-b bg-white">
          <IconButton
            Icon={FilterListIcon}
            //   callback={refresh}
            name="Filter"
            // list={list}
            // iconListDisabled
            className="py-1 px-2 mr-2"
            iconSize={17}
            primary
          />
          <IconButton
            Icon={SortByAlphaIcon}
            //   callback={refresh}
            // name="Filter"
            // list={list}
            // iconListDisabled
            className="py-1 px-2 rounded-r-none"
            iconSize={22}
            primary
          />
          <IconButton
            //   callback={refresh}
            name="Create On"
            list={list}
            // iconListDisabled
            className="py-[4.8px] px-2 border-l-0 rounded-l-none"
            iconSize={17}
            primary
          />
        </div>
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
                    className="text-[0.9em] border-b border-[#f4f6f5] hover:bg-gray-100 cursor-pointer "
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
            <h4 className="text-center mt-28 text-gray-400 font-normal">Data not found</h4>
          )}
        </section>
      </div>
    </div>
  );
};

export default TableComponent;
