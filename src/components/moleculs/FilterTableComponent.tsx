import { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { InputComponent } from "../atoms";
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
  name: {
    valueData: any;
    valueInput: String;
  };
  operator: {
    valueData: any;
    valueInput: String;
  };
  value: {
    valueData: any;
    valueInput: String;
  };
}

interface IProps {
  listFilter: IDataFilter[];
}

const FilterTableComponent: React.FC<IProps> = ({ listFilter }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilter[]>([
    // {
    //   name: "workflowState",
    //   operator: "=",
    //   value: { valueData: "Submitted", valueInput: "Submitted" },
    // },
    // {
    //   name: "name",
    //   operator: "like",
    //   value: { valueData: "Submitted", valueInput: "Submitted" },
    // },
    // {
    //   name: "createdAt",
    //   operator: ">",
    //   value: { valueData: "2023-02-02", valueInput: "2023-02-02" },
    // },
  ]);

  const listDoc = () => {
    const data = listFilter.map((item) => {
      return {
        name: item.name,
        value: item.name,
      };
    });

    return data;
  };

  const getOperator = (doc: string) => {
    const docByFilter = listFilter.filter((item) => item.name === doc);
    if (docByFilter.length > 0) {
      const data = docByFilter.map((item: any) => {
        if (item.operator.length > 0) {
          const isOperator = item.operator.map((op: any) => {
            return { name: op, value: op };
          });
          return isOperator;
        }

        return [];
      });

      return data[0];
    } else {
      return [];
    }
  };

  const modalRef = useRef<any>();

  const addFilter = () => {
    const notValidFilter = filter.filter((item) => {
      return (
        item.name.valueData == "" ||
        item.operator.valueData == "" ||
        item.value.valueData == ""
      );
    });

    if (notValidFilter.length === 0) {
      setFilter([
        ...filter,
        {
          name: { valueData: "", valueInput: "" },
          operator: { valueData: "", valueInput: "" },
          value: { valueData: "", valueInput: "" },
        },
      ]);
    }
  };

  const applyFilter = () => {
    const validFilter = filter.filter((item) => {
      return (
        item.name.valueData !== "" &&
        item.operator.valueData !== "" &&
        item.value.valueData !== ""
      );
    });

    setFilter(validFilter);
    // setOpen(false);

    if (validFilter.length > 0) {
      let isFilter: any = [];
      validFilter.map((item, index) => {
        isFilter[index] = [
          item.name.valueData,
          item.operator.valueData,
          item.value.valueData,
        ];
      });

      console.log(isFilter);
    }
  };

  useEffect(() => {
    let handler = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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
          {filter.length === 0 && (
            <h4 className="w-full border-b-[1.5px] border-[#f1eeee] flex-1 text-center py-6 text-gray-300 font-normal">
              No Filter
            </h4>
          )}
          <ul
            className={`max-h-[200px] h-auto px-6 scrollbar-none my-6 ${
              filter.length > 4 && "overflow-y-auto my-4"
            }`}
          >
            {filter.map((item, index) => (
              <li key={index} className="flex mb-3 relative items-center">
                <InputComponent
                  value={{
                    valueData: item.name.valueData,
                    valueInput: item.name.valueInput,
                  }}
                  onChange={(e) => {
                    item.name.valueInput = e;
                    setFilter([...filter]);
                  }}
                  className="mr-3"
                  list={listDoc()}
                  onSelected={(e) => {
                    item.name.valueData = e.value;
                    item.name.valueInput = e.value;
                    setFilter([...filter]);
                  }}
                  onReset={() => {
                    item.name.valueData = "";
                    item.name.valueInput = "";
                    setFilter([...filter]);
                  }}
                  mandatoy
                  placeholder="Select Doc"
                  inputStyle="text-[0.95em]"
                />
                <InputComponent
                  value={{
                    valueData: item.operator.valueData,
                    valueInput: item.operator.valueInput,
                  }}
                  className="mr-3 w-[250px]"
                  list={getOperator(`${item.name.valueData}`)}
                  disabled={!item.name.valueData}
                  onSelected={(e) => {
                    item.operator.valueData = e.value;
                    item.operator.valueInput = e.value;
                    setFilter([...filter]);
                  }}
                  onChange={(e) => {
                    item.operator.valueInput = e;
                    setFilter([...filter]);
                  }}
                  onReset={() => {
                    item.operator.valueData = "";
                    item.operator.valueInput = "";
                    setFilter([...filter]);
                  }}
                  inputStyle="text-center text-[0.96em] w-[100px]"
                  mandatoy
                />

                <InputComponent
                  value={item.value}
                  className="mr-3"
                  list={[]}
                  onSelected={(e) => {
                    item.value.valueData = e.value;
                    item.value.valueInput = e.value;
                    setFilter([...filter]);
                  }}
                  onChange={(e) => {
                    item.value.valueInput = e;
                    item.value.valueData = e;
                    setFilter([...filter]);
                  }}
                  onReset={() => {
                    item.value.valueData = "";
                    item.value.valueInput = "";
                    setFilter([...filter]);
                  }}
                  inputStyle="text-[0.96em]"
                  disabled={!item.operator.valueData}
                  mandatoy
                />
                <CloseIcon style={{ fontSize: 18 }} className="text-gray-300" />
              </li>
            ))}
          </ul>
          <div
            className={` w-[90%] ml-[5%]  flex py-5 text-sm  sticky bottom-0 ${
              filter.length > 0 && "border-t"
            } bg-white `}
          >
            <div className="flex-1 font-normal flex items-center text-gray-700 opacity-70 hover:opacity-100 duration-200 ">
              <AddIcon style={{ fontSize: 12 }} className="mt-[1px]" />
              <h5 onClick={addFilter}>Add Filter</h5>
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
