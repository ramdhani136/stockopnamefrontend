import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";
import { ButtonStatusComponent, InputComponent } from "../../components/atoms";
import { IValue } from "../../components/atoms/InputComponent";

const FormSchedulePage: React.FC = () => {
  let { id } = useParams();
  const [data, setData] = useState<any>({});
  const [name, setName] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });

  const getData = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.SCHEDULE).FINDONE(`${id}`);
      setData(result.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);

  return (
    <div className=" px-5 h-full flex flex-col">
      <div className="flex mt-4">
        <div className="flex  items-center">
          <h4 className="font-bold text-lg mr-2">New Schedule</h4>
          <div className="text-[0.9em]">
            <ButtonStatusComponent
              // className="text-[0.7em]"
              status="0"
              name={`Not Save`}
            />
          </div>
        </div>
      </div>
      <div className="border w-full flex-1 mt-3 bg-white rounded-md overflow-y-scroll scrollbar-none">
        <div className="w-full h-auto  float-left rounded-md p-3 py-5">
          <div className=" w-1/2 px-4 float-left ">
            <InputComponent
              label="Name"
              value={name}
              className="h-10 text-[0.93em]"
              onChange={(e) =>
                setName({
                  valueData: e,
                  valueInput: e,
                })
              }
            />
            <InputComponent
              label="Warehouse"
              value={name}
              className="h-10 text-[0.93em]"
              onChange={(e) =>
                setName({
                  valueData: e,
                  valueInput: e,
                })
              }
            />
          </div>
          <div className=" w-1/2 px-4 float-left">
            <InputComponent
              label="Date"
              value={name}
              className="h-10  text-[0.93em]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSchedulePage;
