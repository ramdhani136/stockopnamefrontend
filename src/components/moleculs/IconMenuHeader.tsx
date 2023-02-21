import { useState } from "react";

interface IProps {
  Icon: any;
}

const IconMenuHeader: React.FC<IProps> = ({ Icon }) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="relative group" onMouseLeave={() => setActive(false)}>
      <Icon
        onClick={() => setActive(!active)}
        style={{ fontSize: 20 }}
        className=" text-gray-500 ml-2 cursor-pointer"
      />
      <div className="w-[5px] h-[5px]  rounded-full bg-red-400 absolute top-1 right-0 border border-red-500 "></div>
      <ul
        className={`${
          !active && `hidden`
        } border w-72 absolute right-0 top-6 h-80 overflow-y-auto bg-white drop-shadow-sm overflow-hidden`}
      ></ul>
    </div>
  );
};

export default IconMenuHeader;
