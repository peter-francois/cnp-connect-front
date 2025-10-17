import type { UseFormRegister } from "react-hook-form";
import type { LineInterface } from "../../types/interfaces/LineInterface";

interface LineDataInterface {
  lineData: LineInterface;
  onClick: () => void;
  isSelected: boolean;
  register: UseFormRegister<any>; // @dev find right type '--'
  type:string
}

const Line = ({ lineData, onClick, isSelected, register,type }: LineDataInterface) => {
  return (
    <>
      <label
        htmlFor={lineData.name}
        onClick={onClick}
        className={`size-10 border border-indigo-600 rounded-2xl text-center cursor-pointer center ${
          isSelected && "bg-indigo-400 text-gray-900"
        }`}
      >
        {lineData && lineData.name}
      </label>
      <input
        className="absolute -left-96"
        type={ type }
        id={lineData.name}
        checked={isSelected}
        value={lineData.id}
        {...register("lines")}
        readOnly
      />
    </>
  );
};

export default Line;
