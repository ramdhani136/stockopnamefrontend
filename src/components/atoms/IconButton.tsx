import { useState, useEffect, useRef } from "react";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

interface IList {
  name: String;
  onClick(e?: any): void | Promise<void>;
}

interface IProps {
  Icon?: any;
  callback?(e?: any): void | Promise<void>;
  name?: String;
  list?: IList[];
  primary?: boolean;
  iconSize?: number;
  iconListDisabled?: Boolean;
  className?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  classIcon?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
}

const IconButton: React.FC<IProps> = ({
  Icon,
  callback,
  list,
  name,
  primary,
  iconSize,
  iconListDisabled,
  className,
  classIcon,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const modalRef = useRef<any>();
  const eventClick = () => {
    if (list) {
      setOpen(!open);
    } else {
      callback!();
    }
  };

  useEffect(() => {
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
      className={`${
        !primary ? "border-[#1d85e0] bg-[#2491f0] " : "border-gray-200 bg-white"
      } border-[1.5px]  p-[3px] px-1 rounded-md relative cursor-pointer ${className}`}
      onClick={eventClick}
    >
      <div className="flex items-center">
        {Icon && (
          <Icon
            className={`${
              !primary ? "text-white" : "text-gray-800"
            } ${classIcon}`}
            style={{ fontSize: iconSize ?? 12 }}
          />
        )}
        {name && (
          <h5
            className={`text-[0.86em]  font-normal ${
              !primary ? "text-white" : "text-gray-800"
            } ${!Icon && "ml-1"} ${(!list || iconListDisabled) && "mr-1"}`}
          >
            {name}
          </h5>
        )}
        {list && !iconListDisabled && (
          <UnfoldMoreIcon
            className={`${!primary ? "text-white" : "text-gray-800"} ${
              list && "ml-1"
            } `}
            style={{ fontSize: 12 }}
          />
        )}
      </div>
      {list && open && (
        <div ref={modalRef}>
          <ul className="  border-[1.5px] border-gray-200 w-[230px] rounded-md bg-white max-h-72 overflow-y-auto absolute top-8 right-0 drop-shadow-md p-1 ">
            {list.map((item, index) => (
              <li
                key={index}
                className={`w-full  p-3 rounded-md hover:bg-gray-100 cursor-pointer text-[0.86em] text-gray-800 ${
                  index + 1 !== list.length && "border-b border-gray-100"
                } `}
                onClick={item.onClick}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconButton;