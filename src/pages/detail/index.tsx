import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface TypeProps {
  dataSlice: any[];
}
const DetailFont: React.FC<TypeProps> = ({ dataSlice }) => {
  const { family } = useParams();
  const [data, setData] = useState({})

  useEffect(() => {
    if (dataSlice) {
      return setData(dataSlice?.find((item: any) => item?.family === family))
    }
  }, [family, dataSlice]);
  console.log(data, dataSlice)

  return <div>DetailFont {family}</div>;
};

export default DetailFont;
