import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IValue } from "../../components/atoms/InputComponent";

const ScheduleItemPage = () => {
  let { scheduleId, scheduleItem } = useParams();
  const [data, setData] = useState<any>({});
  const [scroll, setScroll] = useState<number>(0);
  const [history, setHistory] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<IValue>({
    valueData: scheduleId,
    valueInput: `${scheduleId}`,
  });
  const [itemCode, setItemCode] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [itemName, setItemName] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [category, setCategory] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [stocker, setStocker] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [warehouse, setWarehouse] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [uom, setUom] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [actualQty, setAqtualQty] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [realQty, setRealQty] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  const [status, setStatus] = useState<IValue>({
    valueData: "",
    valueInput: "",
  });
  return <div>ScheduleItemPage</div>;
};

export default React.memo(ScheduleItemPage);
