import { useEffect, useState } from "react";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";

const LayoutComponent: React.FC = () => {
  const [user, setUser] = useState<String>("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = LocalStorage.loadData(LocalStorageType.TOKEN);
    if (token) {
      const decoded: any = jwt_decode(token);
      setUser(decoded.name);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {/* <HeaderComponent /> */}
      {<SidebarComponent/>}
    </>
  );
};

export default LayoutComponent;
