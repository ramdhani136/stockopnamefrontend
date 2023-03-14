import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import HashLoader from "react-spinners/HashLoader";

export interface IListInput {
  name: String;
  value: any;
}

export interface IValue {
  valueData: any;
  valueInput: String;
}

interface IProps {
  className?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  inputStyle?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  modalStyle?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  itemModalStyle?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  closeIconClass?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  mandatoy?: boolean;
  disabled?: boolean;
  label?: String;
  value: IValue;
  onChange?: (e?: any) => Promise<any> | void;
  onSelected?: (e?: any) => Promise<any> | void;
  onReset?: (e?: any) => Promise<any> | void;
  onCLick?: (e?: any) => Promise<any> | void;
  list?: IListInput[];
  placeholder?: any;
  type?: React.HTMLInputTypeAttribute | undefined;
  min?: any;
  loading?: boolean;
}

const InputComponent: React.FC<IProps> = ({
  className,
  inputStyle,
  mandatoy,
  disabled,
  label,
  value,
  onChange,
  list,
  onSelected,
  onReset,
  placeholder,
  modalStyle,
  itemModalStyle,
  onCLick,
  type,
  closeIconClass,
  min,
  loading,
}) => {
  const modalRef = useRef<any>();
  const inputRef = useRef<any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let handler = (e: any) => {
      if (list) {
        if (!modalRef.current?.contains(e.target)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const filterData = (a: any[]) => {
    return _.filter(a, function (query) {
      var name = value
        ? query.name.toLowerCase().includes(value.valueInput.toLowerCase())
        : true;

      return name;
    });
  };

  return (
    <>
      {label && <label className="text-sm text-gray-800">{label}</label>}
      <div
        onClick={onCLick}
        className={`w-full rounded-md h-8 bg-gray-50  relative ${
          mandatoy && !value.valueData && "border-red-500 border"
        } ${className}`}
      >
        <input
          min={min}
          ref={inputRef}
          type={type ?? "text"}
          placeholder={placeholder}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          value={`${value.valueInput}`}
          className={`w-full  font-normal border h-full z-10 rounded-md bg-gray-50  px-3 ${inputStyle}`}
        />
        {value.valueInput && onReset && !disabled && (
          <CloseIcon
            onClick={() => {
              if (onReset) {
                onCLick && onCLick();
                inputRef.current?.focus();
                setOpen(true);
                onReset();
              }
            }}
            className={` right-1 top-[12px] absolute text-gray-300 ${closeIconClass} `}
            style={{ fontSize: 14 }}
          />
        )}
        {open && list && (
          <div
            ref={modalRef}
            className={`w-full  max-h-[200px] h-auto cursor-pointer  p-1 font-normal text-sm border  scrollbar-none z-50 overflow-y-auto absolute top-7 bg-white rounded-md ${modalStyle}`}
          >
            {!loading &&
              filterData(list)?.map((item, id) => (
                <h4
                  onClick={() => {
                    if (onSelected) {
                      onSelected(item);
                      setOpen(false);
                    }
                  }}
                  key={id}
                  className={`w-full hover:bg-gray-100 rounded-md border-[#ececec] px-3 py-2 ${itemModalStyle}`}
                >
                  {item.name}
                </h4>
              ))}
            {!loading && filterData(list).length < 1 && (
              <h6 className="text-gray-300 text-center text-sm py-3">
                No result
              </h6>
            )}
            {loading && (
              <div className="flex items-center justify-center h-14">
                <HashLoader
                  color="#36d7b6"
                  loading={true}
                  size={22}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InputComponent;
