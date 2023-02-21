import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";

const SeacrhHeaderComponent: React.FC = () => {
  return (
    <div className="w-72 relative">
      <div className="border w-full  h-9 rounded-md bg-gray-100 border-gray-200 flex items-center">
        <SearchOutlinedIcon
          style={{ fontSize: 20 }}
          className="text-gray-400 ml-2 mt-1"
        />
        <input
          placeholder="Seacrh a menu"
          className="bg-gray-100 text-[0.8em] font-sans font-medium px-1 flex-1 mr-2 outline-none"
        />
        <div className="w-[54px] h-[28px] border bg-white rounded-md ml-1 mr-1 flex items-center justify-center text-gray-700">
          <ShortcutOutlinedIcon style={{ fontSize: 13 }} />
          <h6 className="text-[0.8em] font-medium">Enter</h6>
        </div>
      </div>
      <ul className="w-full border h-52 absolute z-10 top-8 bg-white rounded-b-md drop-shadow-sm "></ul>
    </div>
  );
};

export default SeacrhHeaderComponent;
