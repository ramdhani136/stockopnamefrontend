import { useEffect, useState } from "react";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";

const LayoutComponent: React.FC = () => {
  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();
  useEffect(() => {
    const token = LocalStorage.loadData(LocalStorageType.TOKEN);
    if (token) {
      const decoded: any = jwt_decode(token);
      setUser(decoded);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-gray-100">
      {<SidebarComponent user={user}/>}
    </div>
  );
};

export default LayoutComponent;
