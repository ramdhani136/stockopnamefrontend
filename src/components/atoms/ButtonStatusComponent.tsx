import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

interface IProps {
  name: String;
  variant: String;
  className?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  classNameIcon?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
}

const ButtonStatusComponent: React.FC<IProps> = ({
  name,
  variant,
  className,
  classNameIcon,
}) => {
  console.log(variant);

  return (
    <div
      className={` rounded-md p-3 py-[4px]  inline  ${
        className ?? variant == "1"
          ? "text-[#5f9271] bg-[#eaf6ec] font-semibold text-[0.95em]"
          : "bg-[#f4f6f5] border-[#f4f6f5]  border font-normal text-[0.95em]"
      }`}
    >
      <CircleIcon
        style={{ fontSize: 5 }}
        className={`-mt-1 mr-1 ${classNameIcon}`}
      />
      <h4 className={`inline`}>{name}</h4>
    </div>
  );
};

export default ButtonStatusComponent;
