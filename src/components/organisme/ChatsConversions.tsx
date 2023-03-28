import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from "react";
import { InputComponent } from "../atoms";
import CircleIcon from "@mui/icons-material/Circle";
import { IListInput, IValue } from "../atoms/InputComponent";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";

interface IProps {
  setLoading: any;
  setUserConversation: any;
}

interface IConversion {
  user: { id: String; name: String };
  latestMessage: any;
}

const ChatsConversions: React.FC<IProps> = ({
  setLoading,
  setUserConversation,
}) => {
  const [listUser, setListUser] = useState<IListInput[]>([]);
  const [conversions, setConversions] = useState<IConversion[]>([]);
  const [loadingUser, setLoadingUser] = useState<Boolean>(false);
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [user, setUser] = useState<any>({});
  const [hasMore, setHasmore] = useState<boolean>(false);
  const [search, setSearch] = useState<IValue>({
    valueData: null,
    valueInput: "",
  });

  const getUsers = async (): Promise<void> => {
    try {
      const result: any = await GetDataServer(DataAPI.USERS).FIND({
        filters: [["_id", "!=", `${user._id}`]],
        limit: 10,
        page: page,
        search: search.valueData,
      });
      if (result.data.length > 0) {
        let listInput: IListInput[] = result.data.map(
          (item: IListInput | any) => {
            return {
              name: item.name,
              value: item._id,
            };
          }
        );
        if (result.data.length < limit) {
          setHasmore(false);
        } else {
          setHasmore(result.hasMore);
        }

        setPage(result.nextPage);
        setListUser([...listUser, ...listInput]);
      }
      setLoadingUser(false);
    } catch (error) {
      setLoadingUser(false);
    }
  };

  const getConversion = async (): Promise<void> => {
    try {
      const token = LocalStorage.loadData(LocalStorageType.TOKEN);
      let decoded: any;
      if (token) {
        decoded = jwt_decode(token);
      }
      const result: any = await GetDataServer(DataAPI.CHAT).FIND({});
      if (result.data.length > 0) {
        const genData = result.data.map((item: any) => {
          const isUser = item.users.filter((i: any) => {
            return i._id !== decoded._id;
          });
          return {
            latestMessage: item.latestMessage,
            user: isUser[0],
          };
        });
        setConversions(genData);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [search.valueData]);

  useEffect(() => {
    const token = LocalStorage.loadData(LocalStorageType.TOKEN);
    if (token) {
      const decoded: any = jwt_decode(token);
      setUser(decoded);
    }
    getConversion();
  }, []);

  return (
    <div className="w-full h-full  flex flex-col">
      <div className="mx-2 mt-2 ">
        <InputComponent
          value={search}
          onChange={(e) => setSearch({ ...search, valueInput: e })}
          placeholder="Search Name"
          className="h-9"
          inputStyle="placeholder:text-[0.9em] text-sm"
          onReset={() => setSearch({ valueData: null, valueInput: "" })}
          onCLick={getUsers}
          list={listUser}
          itemModalStyle="text-[0.9em]"
          onSelected={(e) => alert("tes")}
          infiniteScroll={{
            hasMore: hasMore,
            next: getUsers,
            onSearch: (e) => {
              setSearch({ ...search, valueData: e });
              setListUser([]);
              setHasmore(false);
              setPage(1);
            },
            loading: loadingUser,
          }}
        />
      </div>
      <ul className="flex-1 mx-2 mt-2 scrollbar-track-gray-50 scrollbar-thumb-gray-100 scrollbar-thin">
        {conversions.length > 0 &&
          conversions.map((item, key) => (
            <li
              key={key}
              onClick={() => {
                setUserConversation(item.user);
              }}
              className="border-b border-[#f2f1f1] rounded-md px-2 py-3 text-sm flex items-center cursor-pointer hover:bg-gray-50 duration-200"
            >
              <div className="relative">
                <Avatar
                  alt={`${item.user.name}`}
                  src="0"
                  sx={{ width: 30, height: 30 }}
                  className={` cursor-pointer`}
                />
                <CircleIcon
                  className={`absolute bottom-0 right-4 text-green-600 border border-white rounded-full bg-white`}
                  style={{ fontSize: 10 }}
                />
              </div>
              <div className="ml-2 flex flex-col justify-center">
                <b className="text-[0.9em]">{item.user.name}</b>
                <h5 className="text-[0.8em] text-gray-500 -mt-[3px]">
                  {item.latestMessage.content.length > 10
                    ? `${item.latestMessage.content.substring(0, 10)} ...`
                    : item.latestMessage.content}
                </h5>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(ChatsConversions);
