import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { IconMenuHeader, SeacrhHeaderComponent } from "../moleculs";

const HeaderComponent: React.FC = () => {

  return (
    <div className="bg-white w-full h-auto py-3 pl-1 border-b flex flex-row sticky top-0  justify-end lg:justify-between  px-6 items-center z-30  drop-shadow-sm">
      <h1 className={`hidden lg:block text-xl ml-3`}>
        Welcome, Ilham Ramdhani
      </h1>

      <div className="text-sm flex items-center">
        <SeacrhHeaderComponent />
        <IconMenuHeader Icon={NotificationsNoneIcon} />
        {/* <IconMenuHeader Icon={ChatBubbleOutlineOutlinedIcon} /> */}
      </div>
    </div>
  );
};

export default HeaderComponent;
