import moment from "moment";

interface IProps {
  data: any[];
}

const TimeLineVertical: React.FC<IProps> = ({ data }) => {
  return (
    <ul className="mt-10 mb-8 text-sm ml-12">
      {data.length > 0 &&
        data.map((item, key) => (
          <li
            key={key}
            className={` pl-5 pb-6  ${
              key+1 !== data.length && "border-l"
            } border-[#d4d4d4] relative float-left w-[70%] text-start`}
          >
            <div className="-mt-[7px] w-[15px] h-[15px] border border-gray-300 absolute rounded-full bg-white -left-[7px]">
              <div className="w-[6px] h-[6px] border absolute rounded-full bg-gray-600 top-[4px] left-[3.8px]"></div>
            </div>
            <h6 className="-mt-[10px] ml-3">
              <b className="font-medium">{item.user.name}</b> {item.message} -{" "}
              {moment(item.createdAt, "YYYYMMDD").fromNow()}
            </h6>
          </li>
        ))}
      {/* <li className="mt-1 pl-5 pb-6   border-l   border-[#d4d4d4] relative float-left w-[70%] text-start">
        <div className="-mt-[7px] w-[15px] h-[15px] border border-gray-300 absolute rounded-full bg-white -left-[7px]">
          <div className="w-[6px] h-[6px] border absolute rounded-full bg-gray-600 top-[4px] left-[3.8px]"></div>
        </div>
        <h6 className="-mt-[10px] ml-3">
          <b className="font-medium">Afrianti Lestari</b> In Confirmation Doc -
          6 hours ago
        </h6>
      </li>
      <li className="mt-1 pl-5 pb-6   border-[#d4d4d4] relative float-left w-[70%] text-start">
        <div className="-mt-[7px] w-[15px] h-[15px] border border-gray-300 absolute rounded-full bg-white -left-[7px]">
          <div className="w-[6px] h-[6px] border absolute rounded-full bg-gray-600 top-[4px] left-[3.8px]"></div>
        </div>
        <h6 className="-mt-[10px] ml-3">
          <b className="font-medium">Afrianti Lestari</b> In changed value of
          Workflow State from Draft to In Confirmation Doc - 6 hours ago
        </h6>
      </li> */}
    </ul>
  );
};

export default TimeLineVertical;
