import { useEffect, useState } from "react";
import { LocalStorage, LocalStorageType } from "../../utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import HeaderComponent from "./HeaderComponent";
import { ModalComponent } from "../moleculs";

interface IProps {
  Child: React.FC;
}

const LayoutComponent: React.FC<IProps> = ({ Child }) => {
  const [user, setUser] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const Childnya: React.FC = () => {
    return <>Halo</>;
  };

  return (
    <>
      <div className="flex h-screen">
        <ModalComponent
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          child={Childnya}
        />
        {<SidebarComponent user={user} />}
        <div className="bg-gray-100 flex-1">
          <HeaderComponent />
          <section className=" w-full h-[86vh]">
            <Child />
          </section>
        </div>
      </div>
    </>
  );
};

export default LayoutComponent;
