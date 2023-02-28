import { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { InputComponent } from "../atoms";
import { IValue } from "../atoms/InputComponent";
import CloseIcon from "@mui/icons-material/Close";

export interface IListFilter {
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

const FilterTableComponent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [value, setValue] = useState<IValue>({ valueData: "", valueInput: "" });
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

  const onSelect = (e: any): void => {
    setValue({ valueData: e.name, valueInput: e.name });
  };

  return (
    <div className="relative  border-[1.5px] rounded-md ml-2 cursor-pointer hover:bg-gray-50 duration-200">
      <div
        className="flex z-30 items-center  px-2 py-[7.1px] "
        onClick={() => setOpen(!open)}
      >
        <FilterListIcon style={{ fontSize: 17 }} />
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
          <ul className={`max-h-[200px] h-auto px-6 scrollbar-none my-6 `}>
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
                  inputStyle="text-[0.93em]"
                />
                <InputComponent
                  value={{
                    valueData: item.operator,
                    valueInput: item.operator,
                  }}
                  onChange={setValue}
                  className="mr-3 w-[100px]"
                  // list={[
                  //   { name: "Equals", value: "=" },
                  //   { name: "Not Equals", value: "!=" },
                  //   { name: "Like", value: "like" },
                  //   { name: "not Like", value: "nl" },
                  //   { name: ">", value: ">" },
                  // ]}
                  // mandatoy
                  inputStyle="text-center w-[100px]"
                />

                <InputComponent
                  value={item.value}
                  onChange={setValue}
                  className="mr-3"
                  // list={[
                  //   { name: "Equals", value: "=" },
                  //   { name: "Not Equals", value: "!=" },
                  //   { name: "Like", value: "like" },
                  //   { name: "not Like", value: "nl" },
                  //   { name: ">", value: ">" },
                  // ]}
                  mandatoy
                />
                <CloseIcon style={{ fontSize: 18 }} className="text-gray-300" />
              </li>
            ))}
          </ul>
          <div className="w-[90%] ml-[5%]  flex py-5 text-sm  sticky bottom-0 border-t bg-white px-5 ">
            <div className="flex-1 font-normal flex items-center ">
              <AddIcon style={{ fontSize: 12 }} className="mt-[1px]" />
              <a href="#" className="">
                Add Filter
              </a>
            </div>
            <div className="font-normal">
              <a
                href="#"
                className="border py-[3px] px-2 rounded-md bg-gray-50 opacity-80 hover:opacity-100 duration-200"
              >
                Clear Filter
              </a>
              <a
                href="#"
                className="ml-2 border py-[3px] px-2 bg-[#1976d3] border-[#166abd] text-white rounded-md  opacity-80 hover:opacity-100 duration-200"
              >
                Aplly Filter
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTableComponent;
