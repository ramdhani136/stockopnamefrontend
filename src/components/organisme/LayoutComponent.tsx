import { useEffect } from "react";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LayoutComponent: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = LocalStorage.loadData(LocalStorageType.TOKEN);
    if (token) {
      const decoded = jwt_decode(token);
      console.log(decoded);
    } else {
      navigate("/login");
    }
  }, []);
  return <div>template</div>;
};

export default LayoutComponent;
