import { useEffect, useState } from "react";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import HeaderComponent from "./HeaderComponent";

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
    <div>
      {<SidebarComponent user={user} />}
      <div className="bg-gray-100">
        <HeaderComponent />
        <section className="border w-full h-[1000px]">
          <div className="w-full flex border">
            <div className="w-1/3 h-36 bg-white border-gray-200 border m-3 ml-1"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LayoutComponent;
