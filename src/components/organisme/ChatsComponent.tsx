import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircleIcon from "@mui/icons-material/Circle";
// import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";

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
  const [open, setOpen] = useState<Boolean>(false);
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
      className={`border w-[300px] h-[410px] absolute bg-white z-[300] right-[30px]  duration-500 rounded-t-lg shadow-md flex flex-col ${
        open ? "bottom-0" : "-bottom-[370px]"
      }`}
    >
      <div className="h-10 border-b  shadow-sm flex justify-evenly  items-center">
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
              alt="Ryan Hadi Dermawan"
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              sx={{ width: 30, height: 30 }}
              className={` cursor-pointer`}
            />
            <CircleIcon
              className={`absolute bottom-0 right-4 text-green-600 border border-white rounded-full bg-white`}
              style={{ fontSize: 10 }}
            />
          </div>
          <div className="flex flex-col ml-2">
            {/* <b className="text-[0.75em] font-medium">Chat Messager</b> */}
            <b className="text-[0.78em] font-medium">Ryan Hadi Dermawan</b>
            <h4
              className={`${
                open ? "text-[0.65em]" : "text-[0px]"
              } text-gray-500 -mt-[2px] font-normal duration-500`}
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
      <div className="flex-1 bg-white overflow-y-auto scrollbar-track-gray-50 scrollbar-thumb-gray-100 scrollbar-thin">
        <div className="w-full h-full flex justify-center items-center">
          <h4 className="text-sm text-gray-400 italic">No Chat</h4>
        </div>
        {/* <div className="h-[10000px] border"></div> */}
      </div>
      <div className="h-auto  flex items-center px-2 py-2">
        <CharIconButtonComponent />
        <div className="h-auto border w-full bg-[#f1f2f6]  rounded-lg ml-2 flex py-2 items-center">
          <textarea className="w-full h-auto max-h-[100px]  block outline-none overflow-hidden resize-none bg-[#f1f2f6] rounded-lg px-2 text-gray-800 text-sm" />
          <InsertEmoticonRoundedIcon className="mr-1 cursor-pointer text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatsComponent);
