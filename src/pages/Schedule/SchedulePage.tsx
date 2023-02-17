import { useEffect } from "react";
import { LayoutComponent } from "../../components/organisme";
import { FetchApi } from "../../utils";

export const SchedulePage: React.FC = () => {
  const getSchedule = async (): Promise<any> => {
    const uri = `http://localhost:5000/schedule`;
    try {
      const result: any = await FetchApi.get(uri);
      console.log(result.data.data);
    } catch (error: any) {
      console.log(error.msg);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div>
      <LayoutComponent />
      SchedulePage
    </div>
  );
};
