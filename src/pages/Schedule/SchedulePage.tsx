import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutComponent } from "../../components/organisme";
import { FetchApi } from "../../utils";

export const SchedulePage: React.FC = () => {
  const [schedules, setSchedule] = useState<any[]>([]);

  const navigate = useNavigate();
  const getSchedule = async (): Promise<any> => {
    const uri = `http://localhost:5000/schedule`;
    try {
      const result: any = await FetchApi.get(uri);
      setSchedule(result.data.data);
    } catch (error: any) {
      if (error.status == 401) {
        navigate("/login");
      }
      //   console.log(error.msg);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      <LayoutComponent />
      {schedules.map((item, key) => (
        <div key={key}>{item.name}</div>
      ))}
    </>
  );
};
