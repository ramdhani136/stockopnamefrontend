import React, { useState } from "react";
import SegmentIcon from "@mui/icons-material/Segment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { Link } from "react-router-dom";

const SidebarComponent: React.FC = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: SegmentIcon },
    { name: "schedule", link: "/schedule", icon: AssignmentOutlinedIcon },
    { name: "report", link: "/report", icon: AssessmentOutlinedIcon },
  ];

  const [open, setOpen] = useState<boolean>(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } text-gray-100 duration-500 px-4`}
      >
        <div className="py-3 flex justify-end" onClick={() => setOpen(!open)}>
          <SegmentIcon className="cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, id) => (
            <Link
              to={menu.link}
              key={id}
              className="flex items-center text-medium gap-3.5 p-2 hover:bg-gray-800 rounded-md"
            >
              <div>
                {React.createElement(menu.icon, { className: "text-sm" })}
              </div>
              <h2 className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu.name}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
        React Tailwind
      </div>
    </section>
  );
};

export default SidebarComponent;
