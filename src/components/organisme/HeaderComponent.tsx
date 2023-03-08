import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { IconMenuHeader, SeacrhHeaderComponent } from "../moleculs";
import SettingsIcon from "@mui/icons-material/Settings";
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

const HeaderComponent: React.FC = () => {
  return (
    <div className="bg-white w-full h-auto py-3 pl-1 border-b flex flex-row sticky top-0 z-[58]  justify-end lg:justify-between  px-6 items-center  drop-shadow-sm">
      {/* <h1 className={`hidden lg:block text-xl ml-3 font-semibold`}>
        Welcome, Ilham Ramdhani
      </h1> */}

      <div className="text-sm flex items-center ml-3">
        <SeacrhHeaderComponent />
        <IconMenuHeader className="ml-1" Icon={TextsmsOutlinedIcon} iconSize={17}/>
        <IconMenuHeader Icon={NotificationsNoneIcon} title="notif" />
      </div>
      <div className="flex items-center">
        <Avatar
          alt="Ilham Ramdhani"
          src="https://img.freepik.com/premium-photo/profile-side-photo-positive-cheerful-programmer-guy-use-computer_274222-19547.jpg"
          sx={{ width: 35, height: 35 }}
          className={`mx-3 cursor-pointer`}
        />
        <div>
          <h4 className=" text-gray-600 text-md text-[0.87em] font-medium -mt-1">
            Ilham Ramdhani
          </h4>
          <h5 className="font-normal text-md text-[0.76em] text-gray-400 -mt-1">
            @ramdhaniit
          </h5>
        </div>
        <SettingsIcon
          className="ml-3 cursor-pointer"
          style={{ fontSize: 15 }}
        />
      </div>
    </div>
  );
};

export default HeaderComponent;
