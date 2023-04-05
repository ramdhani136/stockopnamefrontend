import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../../components/atoms";
import { IListInput, IValue } from "../../components/atoms/InputComponent";
import { LoadingComponent } from "../../components/moleculs";
import { ISliceModal, selectModal } from "../../redux/slices/ModalSlice";
import { AlertModal, FilterKata } from "../../utils";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

const ModalSetSTockManual: React.FC = () => {
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const dataModal: ISliceModal = useSelector(selectModal);
  const data = dataModal.props.params;
  const [qty, setQty] = useState<IValue>({
    valueData: data.real_qty,
    valueInput: `${data.real_qty}`,
  });

  const onSave = async (): Promise<void> => {
    console.log(dataModal.props.onRefresh());
  };

  return (
    <div className=" w-[430px] h-[auto] max-h-[400px]scrollbar-thin scrollbar-track-gray-100 p-7 scrollbar-thumb-gray-200">
      {loadingModal ? (
        <LoadingComponent />
      ) : (
        <>
          <InputComponent
            label="Item Code"
            value={{ valueData: data.item_code, valueInput: data.item_code }}
            className="mb-2"
            disabled
          />
          <InputComponent
            label="Item Name"
            value={{ valueData: data.item_name, valueInput: data.item_name }}
            className="mb-2"
            disabled
          />
          <InputComponent
            label="Stock Qty"
            value={{
              valueData: data.actual_qty,
              valueInput: data.actual_qty.toLocaleString(),
            }}
            className="mb-2"
            disabled
          />
          <InputComponent
            label="Real Qty"
            value={{
              valueData: qty.valueData,
              valueInput: qty.valueInput,
            }}
            className="mb-2"
            onChange={(e) => {
              if (e == 0) {
                setQty({
                  valueData: e,
                  valueInput: "",
                });
              } else if (e < data.actual_qty) {
                setQty({ valueData: e, valueInput: e });
              } else {
                setQty({
                  valueData: parseFloat(data.actual_qty),
                  valueInput: `${data.actual_qty}`,
                });
              }
            }}
            min={0}
            type="number"
          />
          <InputComponent
            label="UOM"
            value={{ valueData: data.stock_uom, valueInput: data.stock_uom }}
            className="mb-2"
            disabled
          />
          <InputComponent
            label="Status"
            value={{
              valueData: data.status,
              valueInput: data.status == "0" ? "Open" : "Checked",
            }}
            className="mb-3"
            disabled
          />
          <button
            onClick={onSave}
            className="cursor-pointer border mt-2 border-green-700 w-full rounded-md py-2 bg-green-600   text-sm text-white opacity-90 hover:opacity-100"
          >
            {data.real_qty == qty.valueData ? `Submit` : "Update"}
          </button>
        </>
      )}
    </div>
  );
};

export default ModalSetSTockManual;
