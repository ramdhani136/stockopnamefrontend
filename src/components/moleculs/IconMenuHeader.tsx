import { useState } from "react";
import { Avatar } from "@mui/material";

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
        } border w-80 absolute right-0 top-6 h-auto overflow-y-auto bg-white drop-shadow-sm overflow-hidden p-2`}
      >
        <li className="w-full  h-16 rounded-md flex items-center px-2 cursor-pointer bg-blue-50 hover:bg-gray-100 mb-2">
          <Avatar
            alt="Ilham Ramdhani"
            src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
            sx={{ width: 50, height: 50 }}
          />
          <ul className="flex-1 ml-2 h-[90%] flex flex-col ">
            <li className="text-[0.9em] mt-[1px]">
              <b className="font-bold">Juan Elbert</b> menambahkan schedule
              nomor <b className="font-bold">SCH20230012030</b>
            </li>
            <li className="text-[0.7em] -mt-1 text-gray-500">30 Minutes ago</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default IconMenuHeader;
