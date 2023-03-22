import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../../components/atoms";
import { IListInput, IValue } from "../../components/atoms/InputComponent";
import { LoadingComponent } from "../../components/moleculs";
import { ISliceModal, selectModal } from "../../redux/slices/ModalSlice";
import { AlertModal, FilterKata } from "../../utils";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

const ModalPackingId: React.FC = () => {
  const [allData, setAllData] = useState<IListInput[]>([]);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const dataModal: ISliceModal = useSelector(selectModal);
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<String>("");
  const [hasMore, setHasmore] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  const navigate = useNavigate();

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const result: any = await GetDataServer(DataAPI.PACKINGID).FIND({
        filters: [
          ["item", "=", dataModal.props.item_code],
          ["is_out", "=", 0],
          ["is_in", "=", 1],
        ],
        limit: limit,
        page: page,
        search: search,
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

        if (result.data.length < limit) {
          setHasmore(false);
        } else {
          setHasmore(result.hasMore);
        }

        setPage(result.nextPage);
        setAllData([...allData, ...genData]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setHasmore(false);
      setLoading(false);
    }
  };

  const [packingId, setPackingId] = useState<IValue>({
    valueData: null,
    valueInput: "",
  });

  const [actualQty, setActualQty] = useState<IValue>({
    valueData: 0,
    valueInput: "",
  });

  const onSave = async (): Promise<void> => {
    const onProgress = async (): Promise<void> => {
      try {
        setLoadingModal(true);
        const insertData = {
          scheduleItemId: dataModal.props._id,
          actual_qty: actualQty.valueData,
          id_packing: packingId.valueData,
        };

        await GetDataServer(DataAPI.PACKING).CREATE(insertData);
        AlertModal.Default({
          icon: "success",
          text: "Successfully added data",
          title: "Success",
        });
        navigate(0);
      } catch (error: any) {
        setLoadingModal(false);
        AlertModal.Default({
          icon: "error",
          title: "Error",
          text: error.response.data.msg.code
            ? "Data already exists"
            : error.response.data.msg ?? "Network Error!",
        });
      }
    };
    AlertModal.confirmation({ onConfirm: onProgress });
  };

  useEffect(() => {
    getData();
  }, [search]);

  useEffect(() => {
    if (dataModal.props.data) {
      setModalData(dataModal.props.data);
    }
  }, []);

  useEffect(() => {
    if (modalData.id_packing) {
      setPackingId({
        valueData: modalData.id_packing,
        valueInput: modalData.id_packing,
      });
      setActualQty({
        valueData: modalData.actual_qty,
        valueInput: modalData.actual_qty,
      });
      setData(modalData);
    }
  }, [modalData]);

  return (
    <div className=" w-[450px] h-[auto] max-h-[400px]scrollbar-thin scrollbar-track-gray-100 p-7 scrollbar-thumb-gray-200">
      {loadingModal ? (
        <LoadingComponent />
      ) : (
        <>
          <InputComponent
            infiniteScroll={{
              hasMore: hasMore,
              next: getData,
              onSearch: (e) => {
                setAllData([]);
                setHasmore(false);
                setPage(1);
                setSearch(FilterKata({ kata: e, filter: ["R", "P", "I"] }));
              },
              loading: loading,
            }}
            onCLick={getData}
            value={packingId}
            list={allData}
            label="Packing ID"
            loading={false}
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
              setActualQty({ valueData: 0, valueInput: "" });
              setModalData({});
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
              value={{
                valueData: data.conversion,
                valueInput: data.conversion,
              }}
              label="Qty"
              className="mb-2 text-sm"
              disabled
            />
          )}
          {data.conversion && (
            <InputComponent
              value={actualQty}
              onChange={(e) => {
                if (e <= data.conversion && e >= 0) {
                  setActualQty({ valueData: e, valueInput: e });
                } else {
                  setActualQty({
                    valueData: data.conversion,
                    valueInput: data.conversion,
                  });
                }
              }}
              onReset={() => setActualQty({ valueData: 0, valueInput: "" })}
              mandatoy
              label="Actual Stock"
              className="mb-2 text-sm"
              type="number"
              max={data.conversion}
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
          {actualQty.valueInput && (
            <button
              onClick={onSave}
              className="cursor-pointer border mt-2 border-green-700 w-full rounded-md py-1 bg-green-600  text-sm text-white opacity-90 hover:opacity-100"
            >
              {modalData.id_packing ? "Update" : "Save"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ModalPackingId;
