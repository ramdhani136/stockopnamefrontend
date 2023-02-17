import { useEffect } from "react";
import axios from "axios";
import { LocalStorage, LocalStorageType } from "../../utils";

export const SchedulePage: React.FC = () => {
  const getSchedule = async (): Promise<any> => {
    const token = LocalStorage.loadData(LocalStorageType.TOKEN);
    const uri = `http://localhost:5000/schedule`;
    const result = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result.data.data);
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return <div>SchedulePage</div>;
};
