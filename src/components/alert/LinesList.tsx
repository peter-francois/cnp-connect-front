import { useQuery } from "@tanstack/react-query";
import { getLines } from "../../api/line.api";
import Line from "./Line";
import { useState } from "react";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { useLinesList } from "../../hooks/useLinesList";
import { UserRolesEnum } from "../../types/enum/UserEnum";

interface LinesListInterface {
  register: UseFormRegister<any>; // @dev find right type '--'
  type: string; // @dev enum
  currentUserRole: UserRolesEnum;
}

const LinesList = ({ register, type , currentUserRole}: LinesListInterface) => {
  const [selectLines, setSelectLines] = useState<LineInterface[]>([]);
  const { isPending, isError, data, error } = useLinesList();
  console.log(selectLines)

  const handleSelectLines = (line: LineInterface) => {
    if (!selectLines.some((item) => item.id === line.id)) {
      
      if (currentUserRole == UserRolesEnum.coordinator) setSelectLines((prev) => [...prev, line]);
      else setSelectLines([line]);
    } else {
      if (currentUserRole == UserRolesEnum.coordinator) setSelectLines((prev) => prev.filter((item) => item.id !== line.id));
      else setSelectLines([]);
    }
  };
  // const handleSelectLines = (line: LineInterface) => {
  //   if (!selectLines.some((item) => item.id === line.id)) {
 // if coordinator setSelectLines((prev) => [...prev, line]);
  //   else conductor setSelectLines([line]);
  // //   } else {

  // //    if coordinator setSelectLines((prev) => prev.filter((item) => item.id !== line.id));
  //       else conductor 
  //   }
  // };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          type="button"
          className="border border-indigo-600 cursor-pointer rounded-2xl py-2 px-3 my-3 text-center hover:bg-indigo-400 hover:text-gray-900 active:text-gray-900 active:bg-indigo-400"
          onClick={() => (selectLines.length === data.length ? setSelectLines([]) : setSelectLines(data))}
        >
          {selectLines.length === data.length ? "Tout désélectionner" : "Tout sélectionner"}
        </button>
      </div>

      <div className="card-border justify-around relative grid grid-flow-col grid-rows-3 gap-y-7 gap-x-2 p-5">
        {data.map((line) => (
          <Line
            key={line.id}
            lineData={line}
            onClick={() => handleSelectLines(line)}
            isSelected={selectLines.some((item) => item.id === line.id)}
            register={register}
            type={type}
          />
        ))}
      </div>
    </>
  );
};

export default LinesList;
