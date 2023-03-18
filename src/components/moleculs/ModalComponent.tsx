interface IProps {
  isVisible?: boolean;
  onClose?: (e?: any) => Promise<any> | void;
}

const ModalComponent: React.FC<IProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e: any): void => {
    if (onClose) {
      if (e.target.id === "wrapper") onClose();
    }
  };

  return (
    <div
      className="w-[100%] h-[100vh] inset-0 fixed  z-[100] flex justify-center items-center  bg-black bg-opacity-50 "
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[500px] h-[400px] bg-white rounded p-2 border border-gray-500"></div>
    </div>
  );
};

export default ModalComponent;
