import { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from '@mui/icons-material/Add';

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
          className="bg-white  border-[1.5px] border-gray-200 w-[550px] h-auto max-h-[300px] absolute top-[38px] scrollbar-none left-0 rounded-md drop-shadow- flex flex-col px-6"
        >
          <h4 className="w-full border-b-[1.5px] border-[#f1eeee] flex-1 text-center py-6 text-gray-300 font-normal">No Filter</h4>
          <div className="w-full  flex items-center py-7 text-sm">
            <div className="flex-1 font-normal flex items-center">
                <AddIcon style={{fontSize:12}} className="mt-[1px]"/>
              <a href="#" className="">
                Add Filter
              </a>
            </div>
            <div className="flex-1 flex justify-end font-normal">
              <a href="#" className="border p-1 px-2 rounded-md bg-gray-50">
                Clear Filter
              </a>
              <a href="#" className="ml-2 border p-1 px-2 rounded-md">
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
