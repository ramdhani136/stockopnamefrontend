import { useEffect, useRef, useState } from "react";

interface IListInput {
  name: String;
  value: any;
}

export interface IValue {
  valueData: any;
  valueInput: String;
}

interface IProps {
  className?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  mandatoy?: boolean;
  disabled?: boolean;
  label?: String;
  value: IValue;
  onChange: any;
  onSelect?: any;
  list?: IListInput[];
}

const InputComponent: React.FC<IProps> = ({
  className,
  mandatoy,
  disabled,
  label,
  value,
  onChange,
  list,
  onSelect,
}) => {
  const inputRef = useRef();
  const modalRef = useRef<any>();
  const [open, setOpen] = useState<boolean>(false);

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
    <div className={`w-full rounded-md bg-gray-50 ${className} relative `}>
      {label && <label>{label}</label>}
      <input
        onClick={() => setOpen(!open)}
        onChange={(e) =>
          onChange({ valueData: null, valueInput: e.target.value })
        }
        value={`${value.valueInput}`}
        className={`${
          label && "mt-1"
        } w-full font-normal border h-7 z-10 rounded-md bg-gray-50  px-3`}
      />
      {open && (
        <div
          ref={modalRef}
          className="w-full max-h-[200px] h-auto  p-1 font-normal text-sm border  scrollbar-none z-20 overflow-y-auto absolute top-7 bg-white rounded-md"
        >
          {list?.map((item, id) => (
            <h4
              key={id}
              className="w-full hover:bg-gray-100 rounded-md border-[#ececec] px-3 py-2"
            >
              {item.name}
            </h4>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputComponent;
