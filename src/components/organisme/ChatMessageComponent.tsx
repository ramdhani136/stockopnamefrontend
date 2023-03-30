import React, { useState, useEffect } from "react";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import gambar from "../../assets/images/nomessage.svg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import ChatBubleComponent from "./ChatBubleComponent";
import { LoadingComponent } from "../moleculs";
import { LocalStorage, SocketIO } from "../../utils";
import ScaleLoader from "react-spinners/ScaleLoader";
import PulseLoader from "react-spinners/PulseLoader";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [newMessage, setNewMessage] = useState<String>("");
  const [moreLoading, setMoreLoading] = useState<Boolean>(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  const getMesssage = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.MESSAGE).FINDONE(
        userConversation.chatId
      );
      setData(result.data);
      setLoading(false);
      SocketIO.emit("join chat", userConversation.chatId);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const sendMessage = async (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (newMessage) {
        SocketIO.emit("stop typing", userConversation.chatId);
        try {
          setNewMessage("");
          const result = await GetDataServer(DataAPI.MESSAGE).CREATE({
            content: newMessage,
            chatId: userConversation.chatId,
          });
          SocketIO.emit("new message", result.data.data);
          setData([...data, result.data.data]);
        } catch (error) {}
      }
    }
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      SocketIO.emit("typing", userConversation.chatId);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SocketIO.emit("stop typing", userConversation.chatId);
      setTyping(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [newMessage]);

  useEffect(() => {
    getMesssage();
  }, []);

  useEffect(() => {
    SocketIO.emit("setup", LocalStorage.getUser()._id);
    SocketIO.on("connected", () => setSocketConnected(true));

    SocketIO.on("typing", () => setTyping(true));
    SocketIO.on("stop typing", () => setTyping(false));
    SocketIO.on("message recieved", (newMessageRecieved) => {
      setData([...data, newMessageRecieved]);
    });
  });

  return (
    <div className="flex flex-col  flex-1 w-full h-full relative">
      {moreLoading && (
        <div className="absolute w-full text-center bg-white z-20 opacity-95 text-[0.8em]  py-1 flex items-center justify-center">
          <h4 className="text-gray-400">Loading</h4>
          <ScaleLoader className="ml-2" height={10} color="#36d7b7" width={3} />
        </div>
      )}
      {!loading ? (
        <>
          {data.length > 0 ? (
            <ul
              id="scrollChat"
              className="flex flex-col-reverse border  flex-1 scrollbar-track-gray-50 scrollbar-thumb-gray-100 scrollbar-thin py-2 text-[0.8em]"
            >
              <InfiniteScroll
                dataLength={data.length}
                next={() => setMoreLoading(true)}
                hasMore={true}
                inverse={true}
                loader={<></>}
                scrollableTarget="scrollChat"
                style={{ overflowX: "hidden" }}
              >
                {data.map((item, index) => (
                  <ChatBubleComponent
                    key={index}
                    data={{
                      ...item,
                      isSameUser:
                        data.length > 1 && index > 0
                          ? data[index - 1].sender._id === item.sender._id
                            ? true
                            : false
                          : false,
                    }}
                  />
                ))}
              </InfiniteScroll>
            </ul>
          ) : (
            <div className=" flex flex-col justify-center items-center flex-1 border">
              <img src={gambar} alt="nomessage" className="w-[160px]" />
              <h4 className="text-[0.8em] text-gray-400  mt-4">No Message</h4>
            </div>
          )}
        </>
      ) : (
        <div className="flex-1">
          <LoadingComponent />
        </div>
      )}
      {typing && (
        <div className="absolute w-full text-center bg-white z-20 opacity-95 text-[0.8em] py-1  flex items-center justify-center bottom-[58px]">
          <PulseLoader className="ml-2" color="#ccc" size={6} />
        </div>
      )}
      <div className="h-auto  flex items-center px-2 py-2">
        <CharIconButtonComponent />
        <form
          onKeyDown={sendMessage}
          className="h-auto border w-full bg-[#f1f2f6]  rounded-lg ml-2 flex py-2 items-center"
        >
          <input
            value={`${newMessage}`}
            onChange={typingHandler}
            className="w-full h-auto  block outline-none overflow-hidden resize-none bg-[#f1f2f6] rounded-lg px-2 text-gray-800 text-sm"
          />
          <InsertEmoticonRoundedIcon
            onClick={() => {
              SocketIO.emit("stop typing", userConversation.chatId);
              setTyping(false);
            }}
            className="mr-1 cursor-pointer text-[#2491f0]"
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(ChatMessageComponent);
