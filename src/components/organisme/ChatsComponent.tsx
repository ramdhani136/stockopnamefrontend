import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircleIcon from "@mui/icons-material/Circle";
// import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface IPropsChatButton {
  onCLick?(e?: any): void | Promise<void>;
}

const ChatIconButton: React.FC<IPropsChatButton> = ({ onCLick }) => {
  const [hover, setHover] = useState<Boolean>(false);
  return (
    <div>
      {hover && (
        <h4 className="absolute border bg-gray-700 text-white text-[0.75em]  text-center rounded-lg p-[4px] px-2 -mt-6 shadow-md">
          File Attachment
        </h4>
      )}
      <AddPhotoAlternateIcon
        onClick={() => {
          onCLick && onCLick();
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="text-gray-400 cursor-pointer"
        style={{ fontSize: 20 }}
      />
    </div>
  );
};

const CharIconButtonComponent = React.memo(ChatIconButton);

export { CharIconButtonComponent };

const ChatsComponent: React.FC = () => {
  const [open, setOpen] = useState<Boolean>(true);
  const modalRef = useRef<any>();

  useEffect(() => {
    let handler = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`border w-[300px] h-[400px] absolute bg-white z-[300] right-[30px]  duration-300 rounded-t-lg shadow-md flex flex-col ${
        open ? "bottom-0" : "-bottom-[360px]"
      }`}
    >
      <div className="h-10 border-bottom shadow-sm flex justify-evenly  items-center">
        <div className="flex flex-1 items-center">
          {open && (
            <div className="ml-2 relative">
              <ArrowBackIosIcon
                className=" text-gray-600 opacity-60 hover:opacity-100 duration-500 cursor-pointer"
                style={{ fontSize: 15 }}
              />
            </div>
          )}
          <div className={`relative ${!open && "ml-2"}`}>
            <Avatar
              alt="Ilham Ramdhani"
              src="https://img.freepik.com/premium-photo/profile-side-photo-positive-cheerful-programmer-guy-use-computer_274222-19547.jpg"
              sx={{ width: 31, height: 31 }}
              className={` cursor-pointer`}
            />
            <CircleIcon
              className={`absolute bottom-0 right-4 text-green-600 border border-white rounded-full bg-white`}
              style={{ fontSize: 10 }}
            />
          </div>
          <div className="flex flex-col ml-2">
            <b className="text-[0.8em] font-medium">Ilham Ramdhani</b>
            <h4
              className={`${
                open ? "text-[0.65em]" : "text-[0px]"
              } text-gray-500 -mt-1 font-normal duration-500`}
            >
              Sedang Aktif
            </h4>
          </div>
        </div>
        <div className="flex items-center  mr-1 justify-center text-gray-500 ">
          <MinimizeIcon
            onClick={() => setOpen(!open)}
            className="-mt-4 cursor-pointer opacity-60 hover:opacity-100 duration-300"
          />
          {/* <CloseIcon
            className=" cursor-pointer opacity-60 hover:opacity-100 duration-300"
            style={{ fontSize: 22 }}
          /> */}
        </div>
      </div>
      <div className="flex-1 border overflow-y-auto scrollbar-track-gray-50 scrollbar-thumb-gray-100 scrollbar-thin">
        <div className="w-full h-full flex justify-center items-center">
          <h4 className="text-sm text-gray-400">No Chat</h4>
        </div>
      </div>
      <div className="h-10 border flex items-center px-2">
        <CharIconButtonComponent />
      </div>
    </div>
  );
};

export default React.memo(ChatsComponent);
