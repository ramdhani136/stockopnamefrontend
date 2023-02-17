import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutComponent } from "../../components/organisme";
import GetDataServer, { DataAPI } from "../../utils/GetDataServer";

export const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useState<any[]>([]);

  const navigate = useNavigate();
  const getSchedule = async (): Promise<any> => {
    try {
      const result: any = await GetDataServer(DataAPI.SCHEDULE).FIND({
        limit: 20,
        page: 1,
        fields: ["name", "user.name"],
        filters: [
          ["name", "=", "SCH202302005"],
          ["name", "=", "SCH202302004"],
        ],
        orderBy: { name: 1 },
      });
      setSchedule(result.data);
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
      alert(error.msg);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      <LayoutComponent />
      {schedules &&
        schedules.map((item, key) => <div key={key}>{item.name}</div>)}
    </>
  );
};
