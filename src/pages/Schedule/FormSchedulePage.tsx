import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  ButtonStatusComponent,
  IconButton,
  InputComponent,
  TimeLineVertical,
  ToggleBodyComponent,
} from "../../components/atoms";
import { IListInput, IValue } from "../../components/atoms/InputComponent";
import { LoadingComponent } from "../../components/moleculs";
import moment from "moment";
import { AlertModal, Meta } from "../../utils";
import ListItemSchedule from "./ListItemSchedule";

const FormSchedulePage: React.FC = () => {
  const metaData = {
    title: "New Schedule - Stock App Ekatunggal",
    description: "Halaman form schedule stock opname web system",
  };

  const navigate = useNavigate();
  let { id } = useParams();

  const [data, setData] = useState<any>({});
  const [scroll, setScroll] = useState<number>(0);
  const [workflow, setWorkflow] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
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

  const [listWarehouse, setListWarehouse] = useState<IListInput[]>([]);

  const getData = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.SCHEDULE).FINDONE(`${id}`);
      setHistory(result.history);
      setWorkflow(result.workflow);
      setData(result.data);

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
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      AlertModal.Default({
        icon: "error",
        title: "Error",
        text: "Data not found!",
      });

      navigate("/schedule");
    }
  };

  const getWarehouse = async (): Promise<void> => {
    try {
      const result: any = await GetDataServer(DataAPI.WAREHOUSE).FIND({});
      if (result.data.length > 0) {
        let listInput: IListInput[] = result.data.map((item: IListInput) => {
          return {
            name: item.name,
            value: item.name,
          };
        });
        setListWarehouse(listInput);
      }
    } catch (error) {}
  };

  const onSave = async (): Promise<any> => {
    alert("d");
  };

  useEffect(() => {
    if (id) {
      getData();
    } else {
      setLoading(false);
    }
  }, []);



  console.log(workflow)

  return (
    <>
      {Meta(metaData)}
      <div
        className="  max-h-[calc(100vh-70px)] overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-300"
        onScroll={(e: any) => setScroll(e.target.scrollTop)}
      >
        {!loading ? (
          <>
            <div
              className={`w-full flex  justify-between px-5 ${
                scroll > 0
                  ? "bg-white border-b border-gray-100 drop-shadow-sm py-6"
                  : "bg-gray-100"
              } py-5 sticky top-0 z-[51] duration-500`}
            >
              <div className="flex  items-center">
                <h4
                  onClick={() => navigate("/schedule")}
                  className="font-bold text-lg mr-2 cursor-pointer"
                >
                  {!id ? "New Schedule" : data.name}
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
                  name={id ? "Update" : "Save"}
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
                      label="Warehouse"
                      value={warehouse}
                      className="h-[38px]   text-[0.93em] mb-3"
                      onChange={(e) =>
                        setWarehouse({ ...warehouse, valueInput: e })
                      }
                      onSelected={(e) =>
                        setWarehouse({
                          valueData: e.value,
                          valueInput: e.value,
                        })
                      }
                      onCLick={getWarehouse}
                      list={listWarehouse}
                      mandatoy
                      modalStyle="top-9 max-h-[160px]"
                      onReset={() =>
                        setWarehouse({ valueData: null, valueInput: "" })
                      }
                      closeIconClass="top-[13.5px]"
                    />
                    {id && (
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
                    )}
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
                  </div>
                  <div className=" w-1/2 px-4 float-left  mb-3">
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
              {id && (
                <ToggleBodyComponent
                  className="mt-5"
                  child={<ListItemSchedule id={`${id}`} />}
                />
              )}
              <TimeLineVertical data={history} />
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
