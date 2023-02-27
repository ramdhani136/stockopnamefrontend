import { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { InputComponent } from "../atoms";

const FilterTableComponent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
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

  return (
    <div className="flex items-center relative   border-[1.5px] rounded-md ml-2 cursor-pointer hover:bg-gray-50 duration-200">
      <div
        className="flex items-center  px-2 py-[7.1px] "
        onClick={() => setOpen(!open)}
      >
        <FilterListIcon style={{ fontSize: 18 }} />
        <h6>Filter</h6>
      </div>
      {open && (
        <div
          ref={modalRef}
          className="bg-white  border-[1.5px] border-gray-200 w-[550px] h-auto max-h-[300px] absolute top-[38px]  left-0 rounded-md drop-shadow- flex flex-col px-6 py-2"
        >
          {/* <h4 className="w-full border-b-[1.5px] border-[#f1eeee] flex-1 text-center py-6 text-gray-300 font-normal">
            No Filter
          </h4> */}
          <ul className="h-full overflow-y-auto scrollbar-none py-6 border-b">
            <li className="flex">
              <InputComponent className="mr-3" />
              <InputComponent className="mr-3 w-[200px] text-center" />
              <InputComponent className="w-[700px]" />
            </li>
          </ul>
          <div className="w-full  flex py-5 text-sm  ">
            <div className="flex-1 font-normal flex items-center ">
              <AddIcon style={{ fontSize: 12 }} className="mt-[1px]" />
              <a href="#" className="">
                Add Filter
              </a>
            </div>
            <div className="font-normal">
              <a
                href="#"
                className="border py-[3px] px-2 rounded-md bg-gray-50"
              >
                Clear Filter
              </a>
              <a
                href="#"
                className="ml-2 border py-[3px] px-2 bg-[#1976d3] border-[#166abd] text-white rounded-md"
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
