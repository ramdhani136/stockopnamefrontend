import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

const FormSchedulePage: React.FC = () => {
  let { id } = useParams();
  const [data, setData] = useState<any>({});

  const getData = async (): Promise<void> => {
    try {
      const result = await GetDataServer(DataAPI.SCHEDULE).FINDONE(`${id}`);
      setData(result.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{data.name}</div>;
};

export default FormSchedulePage;
