import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import { useState, useRef } from "react";

const SeacrhHeaderComponent: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [onSearch, setOnsearch] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const menus = [
    { name: "Form Schedule", link: "/schedule/new" },
    { name: "Schedule List", link: "/schedule" },
    { name: "Workflow List", link: "/workflow" },
    { name: "Form Workflow", link: "/workflow/new" },
  ];

  const click = (): void => {
    setActive(!active);
    active ? inputRef.current?.blur() : inputRef.current?.focus();
  };

  return (
    <div className="w-[19rem] relative">
      <div
        className="border w-full  h-10 rounded-md bg-gray-100 border-gray-200 flex items-center"
        onClick={click}
      >
        <SearchOutlinedIcon
          style={{ fontSize: 20 }}
          className="text-gray-400 ml-2 mt-1"
        />
        <input
          onBlur={() => {
            if (active && !onSearch) {
              setActive(false);
              inputRef.current?.blur();
            }
          }}
          ref={inputRef}
          placeholder="Search a menu"
          className="bg-gray-100 text-[0.95m]  font-normal px-1 flex-1 mr-2 outline-none"
        />
        <div className="w-[54px] h-[28px] border bg-white rounded-md ml-1 mr-1 flex items-center justify-center text-gray-700">
          <ShortcutOutlinedIcon style={{ fontSize: 13 }} />
          <h6 className="text-[0.8em] font-medium">Enter</h6>
        </div>
      </div>
      <ul
        onClick={() => {
          setActive(false);
          inputRef.current?.blur();
        }}
        onMouseLeave={() => setOnsearch(false)}
        onMouseEnter={() => setOnsearch(true)}
        className={`${
          !active && "hidden"
        } p-2 px-1 duration-500 w-full border  max-h-80 overflow-y-auto absolute z-10 top-9 bg-white rounded-b-md drop-shadow-sm text-[0.95em] text-gray-600`}
      >
        {menus.map((menu, id) => (
          <li
            key={id}
            className="p-2 py-3 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => alert("halow")}
          >
            {menu.name}
          </li>
        ))}

        {/* <li className="p-2 py-5 rounded-md cursor-pointer text-center text-gray-400 font-normal">
          Search not found
        </li> */}
      </ul>
    </div>
  );
};

export default SeacrhHeaderComponent;
