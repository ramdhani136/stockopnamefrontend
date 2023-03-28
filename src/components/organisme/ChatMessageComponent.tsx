import React, { useState, useEffect } from "react";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import gambar from "../../assets/images/nomessage.svg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import Avatar from "@mui/material/Avatar";

interface IProps {
  userConversation: any;
}

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

const ChatMessageComponent: React.FC<IProps> = ({ userConversation }) => {
  const getMesssage = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.MESSAGE).FINDONE(
        userConversation.chatId
      );
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    getMesssage();
  }, []);

  return (
    <div className="flex flex-col  flex-1 w-full h-full">
      <ul className="flex-1 border scrollbar-track-gray-50 scrollbar-thumb-gray-100 scrollbar-thin py-2 text-[0.8em]">
        <li className=" w-[80%] flex float-left mb-3 mx-2">
          <Avatar
            alt={`Jamiludin`}
            src="0"
            sx={{ width: 25, height: 25 }}
            className={` cursor-pointer`}
          />
          <div className="rounded-md mx-2 flex-1 p-2 bg-[#e5e6eb] cursor-pointer relative">
            <h4> Iya kenapa pak?</h4>
            <h4 className="absolute z-20 bg-gray-700 text-white rounded-md px-2 py-1 right-0 top-8 opacity-90 text-[0.85em]">
              12 Maret 2022 | 10:28 WIB
            </h4>
          </div>
        </li>
        <li className=" w-[80%] flex rounded-md mx-3 float-right mb-3 relative">
          <div className="rounded-md mx-2 flex-1  p-2 bg-[#0084ff] text-white">
            <h4> Tolong carikan barang kain quilting dengan motif dora</h4>
            <h4 className="absolute z-20 bg-gray-700 text-white rounded-md px-2 py-1 right-0 opacity-90 text-[0.85em]">
              12 Maret 2022 | 10:28 WIB
            </h4>
          </div>
          <Avatar
            alt={`ILham Ramdhani`}
            src="0"
            sx={{ width: 25, height: 25 }}
            className={` cursor-pointer`}
          />
        </li>
        <li className=" w-[80%] flex rounded-md mx-3 float-right mb-3 -mt-2">
          <h4 className="rounded-md mx-2 flex-1  p-2 bg-[#0084ff] text-white cursor-pointer">
            Tolong carikan barang kain quilting dengan motif dora
          </h4>
          {/* <Avatar
            alt={`ILham Ramdhani`}
            src="0"
            sx={{ width: 25, height: 25 }}
            className={` cursor-pointer`}
          /> */}
        </li>
      </ul>
      {/* <div className=" flex flex-col justify-center items-center flex-1 border">
        <img src={gambar} alt="nomessage" className="w-[160px]" />
        <h4 className="text-[0.8em] text-gray-400  mt-4">No Message</h4>
      </div> */}
      <div className="h-auto  flex items-center px-2 py-2">
        <CharIconButtonComponent />
        <div className="h-auto border w-full bg-[#f1f2f6]  rounded-lg ml-2 flex py-2 items-center">
          <textarea className="w-full h-auto max-h-[100px]  block outline-none overflow-hidden resize-none bg-[#f1f2f6] rounded-lg px-2 text-gray-800 text-sm" />
          <InsertEmoticonRoundedIcon className="mr-1 cursor-pointer text-[#2491f0]" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessageComponent);
