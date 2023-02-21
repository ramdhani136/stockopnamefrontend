import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { IconMenuHeader, SeacrhHeaderComponent } from "../moleculs";

const HeaderComponent: React.FC = () => {
  return (
    <div className="bg-white w-full h-auto py-3   border-b flex flex-row justify-between  px-6 items-center z-30">
      <h1 className="text-xl">Welcome, Ilham Ramdhani</h1>

      <div className="text-sm flex items-center">
        <SeacrhHeaderComponent />
        <IconMenuHeader Icon={NotificationsNoneIcon} />
        {/* <IconMenuHeader Icon={ChatBubbleOutlineOutlinedIcon} /> */}
      </div>
    </div>
  );
};

export default HeaderComponent;
