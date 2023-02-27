import { useEffect, useRef, useState } from "react";

interface IProps {
  className?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  mandatoy?: boolean;
  disabled?: boolean;
  label?: String;
  // value: String | number;
  // setValue(): Promise<any> | any;
}

const InputComponent: React.FC<IProps> = ({
  className,
  mandatoy,
  disabled,
  label,
}) => {
  const inputRef = useRef();
  const modalRef = useRef();

  useEffect(() => {}, []);

  return (
    <div className={`w-full   rounded-md bg-gray-50 ${className}`}>
      {label && <label>{label}</label>}
      <input
        className={`${
          label && "mt-1"
        } w-full font-normal border h-7 rounded-md bg-gray-50 outline-none px-3`}
      />
    </div>
  );
};

export default InputComponent;
