import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  ButtonStatusComponent,
  IconButton,
  InputComponent,
} from "../../components/atoms";
import { IValue } from "../../components/atoms/InputComponent";
import { LoadingComponent } from "../../components/moleculs";
import moment from "moment";
import { AlertModal } from "../../utils";

const FormSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [data, setData] = useState<any>({});
  const [scroll, setScroll] = useState<number>(0);
  const [worflow, setWorkflow] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [name, setName] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [user, setUser] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [startDate, setStartDate] = useState<IValue>({
    valueData: moment(Number(new Date())).format("YYYY-MM-DD"),
    valueInput: moment(Number(new Date())).format("YYYY-MM-DD"),
  });
  const [dueDate, setDueDate] = useState<IValue>({
    valueData: moment(Number(new Date())).format("YYYY-MM-DD"),
    valueInput: moment(Number(new Date())).format("YYYY-MM-DD"),
  });
  const [warehouse, setWarehouse] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [createdAt, setCreatedAt] = useState<IValue>({
    valueData: moment(Number(new Date())).format("YYYY-MM-DD"),
    valueInput: moment(Number(new Date())).format("YYYY-MM-DD"),
  });

  const [loading, setLoading] = useState<boolean>(true);
  const getData = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.SCHEDULE).FINDONE(`${id}`);
      setHistory(result.history);
      setWorkflow(result.workflow);
      setData(result.data);
      setName({ valueData: result.data.name, valueInput: result.data.name });
      setWarehouse({
        valueData: result.data.warehouse,
        valueInput: result.data.warehouse,
      });
      setUser({
        valueData: result.data.user._id,
        valueInput: result.data.user.name,
      });
      setCreatedAt({
        valueData: moment(
          Number(
            new Date(moment(Number(new Date())).format(result.data.createdAt))
          )
        ).format("YYYY-MM-DD"),
        valueInput: moment(
          Number(
            new Date(moment(Number(new Date())).format(result.data.createdAt))
          )
        ).format("YYYY-MM-DD"),
      });
      setStartDate({
        valueData: moment(
          Number(
            new Date(moment(Number(new Date())).format(result.data.startdate))
          )
        ).format("YYYY-MM-DD"),
        valueInput: moment(
          Number(
            new Date(moment(Number(new Date())).format(result.data.startdate))
          )
        ).format("YYYY-MM-DD"),
      });
      setDueDate({
        valueData: moment(
          Number(
            new Date(moment(Number(new Date())).format(result.data.dueDate))
          )
        ).format("YYYY-MM-DD"),
        valueInput: moment(
          Number(
            new Date(moment(Number(new Date())).format(result.data.dueDate))
          )
        ).format("YYYY-MM-DD"),
      });
    } catch (error: any) {
      AlertModal.Default({
        icon: "error",
        title: "Error",
        text: "Data not found!",
      });
      navigate("/schedule");
    }
  };

  const onSave = async (): Promise<any> => {
    alert("d");
  };

  useEffect(() => {
    if (id) {
      getData();
    }
    setLoading(false);
  }, []);

  // console.log(worflow);
  console.log(history);

  return (
    <>
      <div
        className="  max-h-[calc(100vh-70px)] overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-300"
        onScroll={(e: any) => setScroll(e.target.scrollTop)}
      >
        {!loading ? (
          <>
            <div
              className={`w-full flex  justify-between px-5 ${
                scroll > 0
                  ? "bg-white border-b border-gray-100 drop-shadow-sm"
                  : "bg-gray-100"
              } py-6 sticky top-0 z-[51] duration-100 `}
            >
              <div className="flex  items-center">
                <h4
                  onClick={() => navigate("/schedule")}
                  className="font-bold text-lg mr-2 cursor-pointer"
                >
                  New Schedule
                </h4>
                <div className="text-[0.9em]">
                  <ButtonStatusComponent
                    // className="text-[0.7em]"
                    status={data.status ?? "0"}
                    name={data.workflowState ?? "Not Save"}
                  />
                </div>
              </div>
              <div className="flex">
                <IconButton
                  classModal="top-[28px]"
                  primary
                  Icon={MoreHorizIcon}
                  iconSize={15}
                  classIcon="mt-1"
                  list={[
                    { name: "Print", onClick: () => {} },
                    { name: "Duplicate", onClick: () => {} },
                    { name: "Export PDF", onClick: () => {} },
                  ]}
                  iconListDisabled
                  className={` duration-100 mr-2 px-2 `}
                />
                <IconButton
                  name="Save"
                  callback={onSave}
                  className={`opacity-80 hover:opacity-100 duration-100  `}
                />
              </div>
            </div>
            <div className=" px-5 flex flex-col ">
              <div className="border w-full flex-1  bg-white rounded-md overflow-y-scroll scrollbar-none">
                <div className="w-full h-auto  float-left rounded-md p-3 py-5">
                  <div className=" w-1/2 px-4 float-left ">
                    <InputComponent
                      label="Name"
                      value={name}
                      className="h-[38px] text-[0.93em] mb-3"
                      onChange={(e) =>
                        setName({
                          valueData: e,
                          valueInput: e,
                        })
                      }
                    />
                    <InputComponent
                      label="Warehouse"
                      value={warehouse}
                      className="h-[38px]   text-[0.93em] mb-3"
                      onChange={(e) =>
                        setWarehouse({
                          valueData: e,
                          valueInput: e,
                        })
                      }
                      mandatoy
                    />
                    <InputComponent
                      label="User"
                      value={user}
                      className="h-[38px]   text-[0.93em] mb-3"
                      onChange={(e) =>
                        setUser({
                          valueData: e,
                          valueInput: e,
                        })
                      }
                      disabled
                    />
                  </div>
                  <div className=" w-1/2 px-4 float-left  mb-3">
                    <InputComponent
                      label="Date"
                      value={createdAt}
                      className="h-[38px]  text-[0.93em] mb-3"
                      type="date"
                      onChange={(e) =>
                        setCreatedAt({
                          valueData: e,
                          valueInput: e,
                        })
                      }
                      disabled
                    />
                    <InputComponent
                      label="startDate"
                      value={startDate}
                      className="h-[38px]  text-[0.93em] mb-3"
                      type="date"
                      onChange={(e) =>
                        setStartDate({
                          valueData: e,
                          valueInput: e,
                        })
                      }
                      mandatoy
                    />
                    <InputComponent
                      label="dueDate"
                      value={dueDate}
                      className="h-[38px]  text-[0.93em] mb-3"
                      type="date"
                      onChange={(e) =>
                        setDueDate({
                          valueData: e,
                          valueInput: e,
                        })
                      }
                      mandatoy
                    />
                  </div>
                </div>
              </div>
              <ul className="mt-10 mb-8 text-sm ml-12">
                <li className=" pl-5 pb-6   border-l border-[#e4e6e5] relative float-left w-[70%] text-start">
                  <div className="-mt-[7px] w-[15px] h-[15px] border border-gray-300 absolute rounded-full bg-white -left-[7px]">
                    <div className="w-[6px] h-[6px] border absolute rounded-full bg-gray-600 top-[4.1px] left-[3.8px]"></div>
                  </div>
                  <h6 className="-mt-[10px] ml-3">
                    <b className="font-medium">Muhammad Takiyudin</b> changed
                    values for Available Qty at From Warehouse from 2.287 to
                    2.237 in row #0, Available Qty at From Warehouse from 250 to
                    247 in row #2 - 4 hours ago
                  </h6>
                </li>
                <li className="mt-1 pl-5 pb-6   border-l   border-[#e4e6e5] relative float-left w-[70%] text-start">
                  <div className="-mt-[7px] w-[15px] h-[15px] border border-gray-300 absolute rounded-full bg-white -left-[7px]">
                    <div className="w-[6px] h-[6px] border absolute rounded-full bg-gray-600 top-[4.1px] left-[3.8px]"></div>
                  </div>
                  <h6 className="-mt-[10px] ml-3">
                    <b className="font-medium">Afrianti Lestari</b> In
                    Confirmation Doc - 6 hours ago
                  </h6>
                </li>
                <li className="mt-1 pl-5 pb-6   border-[#e4e6e5] relative float-left w-[70%] text-start">
                  <div className="-mt-[7px] w-[15px] h-[15px] border border-gray-300 absolute rounded-full bg-white -left-[7px]">
                    <div className="w-[6px] h-[6px] border absolute rounded-full bg-gray-600 top-[4.1px] left-[3.8px]"></div>
                  </div>
                  <h6 className="-mt-[10px] ml-3">
                    <b className="font-medium">Afrianti Lestari</b> In changed
                    value of Workflow State from Draft to In Confirmation Doc -
                    6 hours ago
                  </h6>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <LoadingComponent />
        )}
      </div>
    </>
  );
};

export default FormSchedulePage;
