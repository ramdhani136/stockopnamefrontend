import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface IProps {
  className?: React.HTMLAttributes<HTMLDivElement> | string | undefined;
  child: React.FC;
}

const ToggleBodyComponent: React.FC<IProps> = ({ className,child }) => {
  const Child: React.FC = child;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={`${className} border bg-white rounded-md py-4 px-6`}>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h4 className="font-medium">Item List</h4>
        {open ? (
          <ExpandLessIcon style={{ fontSize: 20 }} className={`ml-2 mt-1`} />
        ) : (
          <ExpandMoreIcon style={{ fontSize: 20 }} className={`ml-2 mt-1`} />
        )}
      </div>
      {open && <div className={`w-full mt-4 mb-3  duration-700`}>
        <Child/>
        </div>}
    </div>
  );
};

export default ToggleBodyComponent;
