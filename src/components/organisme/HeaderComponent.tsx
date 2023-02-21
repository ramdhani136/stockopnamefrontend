import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";

const HeaderComponent: React.FC = () => {
  return (
    <div className="bg-white w-full h-auto py-3   border-b flex flex-row justify-between  px-6 items-center">
      <h1 className="text-xl">Welcome, Ilham Ramdhani</h1>

      <div className="text-sm flex items-center">
        <div className="border w-72 h-9 rounded-md bg-gray-100 border-gray-200 flex items-center">
          <SearchOutlinedIcon
            style={{ fontSize: 20 }}
            className="text-gray-400 ml-2 mt-1"
          />
          <input
            placeholder="Seacrh a menu"
            className="bg-gray-100 text-[0.8em] font-sans font-medium px-1 flex-1 mr-2 outline-none"
          />
          <div className="w-[54px] h-[28px] border bg-white rounded-md ml-1 mr-1 flex items-center justify-center text-gray-600">
            <ShortcutOutlinedIcon style={{ fontSize: 13 }} />
            <h6 className="text-[0.8em] font-medium">Enter</h6>
          </div>
        </div>
        <div className="relative">
          <NotificationsNoneIcon
            style={{ fontSize: 20 }}
            className=" text-gray-500 ml-2"
          />
          <div className="w-2 h-2  rounded-full bg-red-500 absolute top-0 -right-0 border border-red-600 "></div>
        </div>
        <div className="relative">
          <MarkChatUnreadOutlinedIcon
            style={{ fontSize: 18 }}
            className=" text-gray-500 ml-3"
          />
          <div className="w-2 h-2  rounded-full bg-red-500 absolute top-0 -right-1 border border-red-600 "></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
