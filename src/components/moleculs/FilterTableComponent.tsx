import { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { InputComponent } from "../atoms";
import { IValue } from "../atoms/InputComponent";
import CloseIcon from "@mui/icons-material/Close";

export interface IDataFilter {
  name: String;
  oprator: String;
  typeof: String;
  listData?: any[];
  value: {
    valueData: any;
    valueInput: String;
  };
}

interface IFilter {
  name: String;
  operator: String;
  value: {
    valueData: any;
    valueInput: String;
  };
}

interface IProps {}

const FilterTableComponent: React.FC<IProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [filter, setFilter] = useState<IFilter[]>([
    {
      name: "workflowState",
      operator: "=",
      value: { valueData: "Submitted", valueInput: "Submitted" },
    },
    {
      name: "name",
      operator: "like",
      value: { valueData: "Submitted", valueInput: "Submitted" },
    },
    {
      name: "createdAt",
      operator: ">",
      value: { valueData: "2023-02-02", valueInput: "2023-02-02" },
    },
  ]);

  const modalRef = useRef<any>();

  useEffect(() => {
    let handler = (e: any) => {
      if (!modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const applyFilter = () => {
    console.log(filter);
  };

  return (
    <div className="relative  border-[1.5px] rounded-md ml-2 cursor-pointer hover:bg-gray-50 duration-200">
      <div
        className="flex z-30 items-center  px-2 py-[7.1px] "
        onClick={() => setOpen(!open)}
      >
        <FilterListIcon style={{ fontSize: 17 }} />
        {filter.length > 0 && (
          <h6 className=" rounded-full inline px-[5px]  text-[0.8em] mx-1 font-normal bg-red-200 text-red-500">
            {filter.length}
          </h6>
        )}
        <h6 className="font-normal">Filter</h6>
      </div>
      {open && (
        <div
          ref={modalRef}
          className="bg-white  border-[1.5px] border-gray-200 w-[550px] h-auto max-h-[300px] absolute top-[38px]  left-0 rounded-md drop-shadow-md"
        >
          {/* <h4 className="w-full border-b-[1.5px] border-[#f1eeee] flex-1 text-center py-6 text-gray-300 font-normal">
            No Filter
          </h4> */}
          <ul
            className={`max-h-[200px] h-auto px-6 scrollbar-none my-6 ${
              filter.length > 2 && "overflow-y-auto my-4"
            }`}
          >
            {filter.map((item, index) => (
              <li key={index} className="flex mb-3 relative items-center">
                <InputComponent
                  value={{ valueData: item.name, valueInput: item.name }}
                  onChange={(e) => {
                    item.name = e;
                    setFilter([...filter]);
                  }}
                  className="mr-3"
                  list={[
                    { name: "workflowState", value: "workflowState" },
                    { name: "name", value: "name" },
                  ]}
                  onSelected={(e) => {
                    item.name = e.value;
                    setFilter([...filter]);
                  }}
                  onReset={() => {
                    item.name = "";
                    setFilter([...filter]);
                  }}
                  mandatoy
                  placeholder="Select Doc"
                  inputStyle="text-[0.96em]"
                />
                <InputComponent
                  value={{
                    valueData: item.operator,
                    valueInput: item.operator,
                  }}
                  className="mr-3 w-[100px]"
                  list={[]}
                  disabled={!item.name}
                  // onSelected={(e) => {
                  //   item.operator = e.value;
                  //   setFilter([...filter]);
                  // }}
                  onChange={(e) => {
                    item.operator = e;
                    setFilter([...filter]);
                  }}
                  onReset={() => {
                    item.operator = "";
                    setFilter([...filter]);
                  }}
                  inputStyle="text-center text-[0.96em] w-[100px]"
                />

                <InputComponent
                  value={item.value}
                  className="mr-3"
                  // list={[
                  //   { name: "Equals", value: "=" },
                  //   { name: "Not Equals", value: "!=" },
                  //   { name: "Like", value: "like" },
                  //   { name: "not Like", value: "nl" },
                  //   { name: ">", value: ">" },
                  // ]}
                  inputStyle="text-[0.96em]"
                  mandatoy
                />
                <CloseIcon style={{ fontSize: 18 }} className="text-gray-300" />
              </li>
            ))}
          </ul>
          <div className="w-[90%] ml-[5%]  flex py-5 text-sm  sticky bottom-0 border-t bg-white ">
            <div className="flex-1 font-normal flex items-center ">
              <AddIcon style={{ fontSize: 12 }} className="mt-[1px]" />
              <h5
                className=""
                onClick={() => {
                  setFilter([
                    ...filter,
                    {
                      name: "",
                      operator: "",
                      value: { valueData: "", valueInput: "" },
                    },
                  ]);
                }}
              >
                Add Filter
              </h5>
            </div>
            <div className="font-normal">
              <h5 className="border py-[3px] px-2 rounded-md inline bg-gray-50 opacity-80 hover:opacity-100 duration-200">
                Clear Filter
              </h5>
              <h5
                onClick={applyFilter}
                className="ml-2 border inline py-[3px] px-2 bg-[#1976d3] border-[#166abd] text-white rounded-md  opacity-80 hover:opacity-100 duration-200"
              >
                Aplly Filter
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTableComponent;
