import React, { useEffect, useState } from "react";
import { InputComponent } from "../../components/atoms";
import { IListInput, IValue } from "../../components/atoms/InputComponent";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

const ModalPackingId: React.FC = () => {
  const [data, setData] = useState<IListInput[]>([]);

  const getData = async (): Promise<void> => {
    try {
      const result: any = await GetDataServer(DataAPI.PACKINGID).FIND({});
      if (result.data.length > 0) {
        const genData: IListInput[] = result.data.map(
          (item: any): IListInput => {
            return {
              name: item.id_packing,
              value: item.id_packing,
            };
          }
        );
        setData(genData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [packingId, setPackingId] = useState<IValue>({
    valueData: null,
    valueInput: "",
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-[450px] h-[auto] max-h-[400px]scrollbar-thin scrollbar-track-gray-100 p-5 scrollbar-thumb-gray-200">
      <InputComponent
        value={packingId}
        list={data}
        label="Packing ID"
        onChange={(e) => {
          setPackingId({ ...packingId, valueInput: e });
        }}
      />
    </div>
  );
};

export default ModalPackingId;
