import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import { SeacrhHeaderComponent } from "../moleculs";

const HeaderComponent: React.FC = () => {
  return (
    <div className="bg-white w-full h-auto py-3   border-b flex flex-row justify-between  px-6 items-center">
      <h1 className="text-xl">Welcome, Ilham Ramdhani</h1>

      <div className="text-sm flex items-center">
        <SeacrhHeaderComponent />
        <div className="relative">
          <NotificationsNoneIcon
            style={{ fontSize: 20 }}
            className=" text-gray-500 ml-2 cursor-pointer"
          />
          <div className="w-2 h-2  rounded-full bg-red-500 absolute top-0 -right-0 border border-red-600 "></div>
        </div>
        <div className="relative">
          <MarkChatUnreadOutlinedIcon
            style={{ fontSize: 18 }}
            className=" text-gray-500 ml-3 cursor-pointer"
          />
          <div className="w-2 h-2  rounded-full bg-red-500 absolute top-0 -right-1 border border-red-600 "></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
