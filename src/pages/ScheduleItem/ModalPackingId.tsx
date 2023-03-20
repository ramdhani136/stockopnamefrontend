import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputComponent } from "../../components/atoms";
import { IListInput, IValue } from "../../components/atoms/InputComponent";
import { ISliceModal, selectModal } from "../../redux/slices/ModalSlice";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

const ModalPackingId: React.FC = () => {
  const [allData, setAllData] = useState<IListInput[]>([]);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const dataModal: ISliceModal = useSelector(selectModal);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const result: any = await GetDataServer(DataAPI.PACKINGID).FIND({
        filters: [["item", "=", dataModal.props.item_code]],
      });
      if (result.data.length > 0) {
        const genData: IListInput[] = result.data.map(
          (item: any): IListInput => {
            return {
              name: item.id_packing,
              value: item,
            };
          }
        );
        setAllData(genData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [packingId, setPackingId] = useState<IValue>({
    valueData: null,
    valueInput: "",
  });

  useEffect(() => {}, []);

  return (
    <div className=" w-[450px] h-[auto] max-h-[400px]scrollbar-thin scrollbar-track-gray-100 p-7 scrollbar-thumb-gray-200">
      <InputComponent
        onCLick={getData}
        value={packingId}
        list={allData}
        label="Packing ID"
        loading={loading}
        onChange={(e) => {
          setPackingId({ ...packingId, valueInput: e });
        }}
        onSelected={(e) => {
          setData(e.value),
            setPackingId({
              valueData: e.value.id_packing,
              valueInput: e.value.id_packing,
            });
        }}
        className="mb-2 text-sm"
        onReset={() => {
          setPackingId({ valueData: null, valueInput: "" });
          setData({});
        }}
      />
      {data.item && (
        <InputComponent
          value={{ valueData: data.item, valueInput: data.item }}
          label="Item Code"
          className="mb-2 text-sm"
          disabled
        />
      )}
      {data.item_name && (
        <InputComponent
          value={{ valueData: data.item_name, valueInput: data.item_name }}
          label="Item Name"
          className="mb-2 text-sm"
          disabled
        />
      )}
      {data.conversion && (
        <InputComponent
          value={{ valueData: data.conversion, valueInput: data.conversion }}
          label="Qty"
          className="mb-2 text-sm"
          disabled
        />
      )}
      {data.conversion && (
        <InputComponent
          value={{ valueData: null, valueInput: "" }}
          mandatoy
          label="Actual Stock"
          className="mb-2 text-sm"
          type="number"
        />
      )}
      {data.stock_uom && (
        <InputComponent
          value={{ valueData: data.stock_uom, valueInput: data.stock_uom }}
          label="Uom"
          disabled
          className="mb-2 text-sm"
        />
      )}
    </div>
  );
};

export default ModalPackingId;
