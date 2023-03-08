import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { Console } from "console";

const FormSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState<any>({});
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

  const [loading, setLoading] = useState<boolean>(false);
  const getData = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.SCHEDULE).FINDONE(`${id}`);
      setData(result.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSave = async (): Promise<any> => {
    alert("d");
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);

  return (
    <div className=" px-5 h-full flex flex-col">
      {!loading ? (
        <>
          <div className="flex mt-4 justify-between">
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
                  status="0"
                  name={`Not Save`}
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
          <div className="border w-full flex-1 mt-3 bg-white rounded-md overflow-y-scroll scrollbar-none">
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
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default FormSchedulePage;
