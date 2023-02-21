import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { IconMenuHeader, SeacrhHeaderComponent } from "../moleculs";

const HeaderComponent: React.FC = () => {
  return (
    <div className="bg-white w-full h-auto py-3   border-b flex flex-row  justify-center md:justify-end lg:justify-between  px-6 items-center z-30">
      <h1 className="hidden lg:block text-xl">Welcome, Ilham Ramdhani</h1>

      <div className="text-sm flex items-center">
        <SeacrhHeaderComponent />
        <IconMenuHeader Icon={NotificationsNoneIcon} />
        {/* <IconMenuHeader Icon={ChatBubbleOutlineOutlinedIcon} /> */}
        <div className="md:hidden">
          <MenuOutlinedIcon
            style={{ fontSize: 30 }}
            className=" ml-3 mt-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
