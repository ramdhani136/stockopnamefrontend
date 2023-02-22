import { useState, useEffect, useRef } from "react";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

interface IProps {
  Icon: any;
  Callback(e?: any): void | Promise<void>;
  name?: String;
  list?: any[];
}

const IconButton: React.FC<IProps> = ({ Icon, Callback, list }) => {
  const [open, setOpen] = useState<boolean>(false);
  const modalRef = useRef<any>();
  const eventClick = () => {
    if (list) {
      setOpen(!open);
    } else {
      Callback();
    }
  };

  useEffect(() => {
    console.log(modalRef);
    let handler = (e: any) => {
      if (list) {
        if (!modalRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div
      className=" border-[1.5px] border-gray-200 p-[4px] px-2 bg-white rounded-md relative cursor-pointer"
      onClick={eventClick}
    >
      <div className="flex items-center">
        <Icon className="text-gray-700 " style={{ fontSize: 13 }} />
        <h5 className="text-sm ml-1 font-normal text-gray-800">Add Schedule</h5>
        {list && (
          <UnfoldMoreIcon
            className="text-gray-800 ml-2"
            style={{ fontSize: 15 }}
          />
        )}
      </div>
      {list && open && (
        <div ref={modalRef}>
          <ul className="  border-[1.5px] border-gray-200 w-[230px] rounded-md bg-white max-h-72 overflow-y-auto absolute top-8 right-0 drop-shadow-md p-1 py-3 ">
            <li
              className="w-full  p-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-gray-800 "
              onClick={() => alert("d")}
            >
              Import
            </li>
            <li className="w-full  p-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-gray-800 ">
              User Permission
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconButton;
