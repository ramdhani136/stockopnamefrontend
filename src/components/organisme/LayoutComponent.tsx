import { useEffect, useState } from "react";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
  return <div>Halo, {user}</div>;
};

export default LayoutComponent;
