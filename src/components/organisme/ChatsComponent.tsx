import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircleIcon from "@mui/icons-material/Circle";
// import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import gambar from "../../assets/images/nomessage.svg";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ChatsConversions from "./ChatsConversions";
import { LoadingComponent } from "../moleculs";

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
        className="text-[#2491f0] cursor-pointer"
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
  const [loading, setLoading] = useState<Boolean>(false);
  const [userConversation, setUserConversation] = useState<any>({});

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
      className={`border  h-[410px] absolute bg-white z-[300]   duration-300 rounded-t-lg shadow-md flex flex-col ${
        open
          ? "bottom-0 w-[300px] right-[20px]"
          : "-bottom-[375px] w-[230px] right-[5px]"
      }`}
    >
      <div
        className={`${
          open ? "h-10" : "h-9"
        } border-b  shadow-sm flex justify-evenly  items-center duration-500`}
      >
        <div className="flex flex-1 items-center">
          {open && userConversation._id && (
            <div className="ml-2 relative">
              <ArrowBackIosIcon
                onClick={() => setUserConversation({})}
                className=" text-gray-600 opacity-60 hover:opacity-100 duration-500 cursor-pointer"
                style={{ fontSize: 15 }}
              />
            </div>
          )}
          {userConversation._id && (
            <div className={`relative ${!open && "ml-2"}`}>
              <Avatar
                alt={`${userConversation.name}`}
                src="d"
                sx={{ width: open ? 30 : 25, height: open ? 30 : 25 }}
                className={` cursor-pointer`}
              />
              <CircleIcon
                className={`absolute bottom-0 right-4 text-green-600 border border-white rounded-full bg-white`}
                style={{ fontSize: open ? 10 : 8 }}
              />
            </div>
          )}

          <div className="flex flex-col ml-2">
            {!userConversation._id ? (
              <div className="flex items-center">
                <QuestionAnswerOutlinedIcon
                  style={{ fontSize: 13 }}
                  className="mr-1 mt-[2px] "
                />
                <b className="text-[0.75em] font-medium">Chat Messager</b>
              </div>
            ) : (
              <>
                <b className="text-[0.75em] font-medium">{userConversation.name}</b>
                <h4
                  className={`${
                    open ? "text-[0.68em]" : "text-[0px]"
                  } text-gray-500 -mt-[3px] font-normal duration-500`}
                >
                  Sedang Aktif
                </h4>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center  mr-1 justify-center text-gray-500 ">
          <MinimizeIcon
            onClick={() => setOpen(!open)}
            className="-mt-4 cursor-pointer opacity-60 hover:opacity-100 duration-300"
          />
        </div>
      </div>
      <div className="flex-1 bg-white overflow-y-auto scrollbar-track-gray-50 scrollbar-thumb-gray-100 scrollbar-thin">
        {loading ? (
          <LoadingComponent />
        ) : userConversation._id ? (
          <>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img src={gambar} alt="nomessage" className="w-[160px]" />
              <h4 className="text-[0.8em] text-gray-400  mt-4">No Message</h4>
            </div>
          </>
        ) : (
          <ChatsConversions
            setLoading={setLoading}
            setUserConversation={setUserConversation}
          />
        )}
      </div>
      {userConversation._id && (
        <div className="h-auto  flex items-center px-2 py-2">
          <CharIconButtonComponent />
          <div className="h-auto border w-full bg-[#f1f2f6]  rounded-lg ml-2 flex py-2 items-center">
            <textarea className="w-full h-auto max-h-[100px]  block outline-none overflow-hidden resize-none bg-[#f1f2f6] rounded-lg px-2 text-gray-800 text-sm" />
            <InsertEmoticonRoundedIcon className="mr-1 cursor-pointer text-[#2491f0]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatsComponent);
