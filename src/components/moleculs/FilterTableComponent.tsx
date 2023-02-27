import { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

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
      <div className="flex items-center border px-2 py-[7.1px] " onClick={() => setOpen(!open)}>
        <FilterListIcon style={{ fontSize: 18 }} />
        <h6>Filter</h6>
      </div>
      {open && (
        <div
          ref={modalRef}
          className="bg-white border w-[500px] h-[250px] absolute top-[37px] left-0 rounded-md drop-shadow-md"
        ></div>
      )}
    </div>
  );
};

export default FilterTableComponent;
