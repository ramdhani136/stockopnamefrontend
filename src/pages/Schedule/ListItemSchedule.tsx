import { useEffect, useState } from "react";

interface IProps {
  data: any[];
}

const ListItemSchedule: React.FC<IProps> = ({ data }) => {
  console.log(data);
  return <div>ListItemSchedule</div>;
};

export default ListItemSchedule;
