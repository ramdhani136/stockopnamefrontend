import React, { useState } from "react";
import SegmentIcon from "@mui/icons-material/Segment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import { Avatar } from "@mui/material";

const SidebarComponent: React.FC = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: DashboardOutlinedIcon },
    { name: "schedules", link: "/schedule", icon: AssignmentOutlinedIcon },
    { name: "reports", link: "/report", icon: AssessmentOutlinedIcon },
  ];

  const [open, setOpen] = useState<boolean>(true);

  return (
    <section className="flex">
      <div
        className={`bg-[#1b1c1e] min-h-screen ${
          open ? "w-72" : "w-16"
        } text-gray-100 duration-500 px-3 flex flex-col justify-around`}
      >
        <div
          className="py-3 flex  justify-between items-center"
          onClick={() => setOpen(!open)}
        >
          <h1 className={`${!open && "hidden duration-500"} ml-1 text-2xl`}>
            SOSystem
          </h1>

          <SegmentIcon
            className="cursor-pointer ml-1"
            style={{ fontSize: 21 }}
          />
        </div>
        <nav
          className={`${
            !open && "hidden duration-500"
          } h-8 border-b border-[#393a3b] text-[#48494b]`}
        >
          Search
        </nav>
        <div className="mt-4 flex flex-col  gap-2 relative">
          <h4 className="text-[#3c3d3f] text-[0.7em] font-bold ml-2 ">MENU</h4>
          {menus.map((menu, id) => (
            <Link
              to={menu.link}
              key={id}
              className="group flex items-center text-medium gap-3.5 p-2 hover:bg-[#323335] rounded-md"
            >
              <menu.icon style={{ fontSize: 20 }} />
              <h2
                style={{
                  transitionDelay: `${id + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && `hidden`
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="w-full flex-1 flex  justify-end flex-col mb-5">
          <h4 className="text-[#3c3d3f] text-[0.7em] font-bold ml-2">
            PROFILE
          </h4>
          <div className="flex m-2">
            <Avatar
              alt="Ilham Ramdhani"
              src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
              sx={{ width: 35, height: 35 }}
            />
            <div className="flex flex-col justify-center ml-2">
              <h4 className="text-[0.8em]">Ilham Ramdhani</h4>
              <h5 className="text-[0.7em] text-[#6d6e70] font-semibold">
                @ramdhaniit
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-xl text-gray-900 font-semibold h-full">
        <HeaderComponent />
      </div>
    </section>
  );
};

export default SidebarComponent;
