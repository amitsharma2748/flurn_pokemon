import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardTemp from "./CardTemp";

const Bookmark = () => {
  const [data, setData] = useState([]);
  const datas = useSelector((state) => state.tasks.tasks);
  //   console.log(datas);
  useEffect(() => {
    setData(datas);
  }, [datas]);
  console.log(data);
  return (
    <div className="flex flex-wrap m-auto justify-center">
      {data?.map((item, index) => (
        <div className="text-center mt-4 w-fit mx-5 mb-4" key={item?.name}>
          <CardTemp
            attack={item?.stats[1]?.base_stat}
            defence={item?.stats[0]?.base_stat}
            name={item?.name}
            url={item?.sprites.other["official-artwork"].front_default}
            id={index}
          />
        </div>
      ))}
    </div>
  );
};

export default Bookmark;
