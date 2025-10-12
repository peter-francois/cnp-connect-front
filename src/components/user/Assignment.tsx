import { XCircleIcon } from "@heroicons/react/24/solid";
import SecondaryTitle from "../utils/SecondaryTitle";
import PrimaryButton from "../utils/PrimaryButton";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import { useState } from "react";

interface AssignmentInterface {
  userRole: UserRolesEnum;
  lines: LineInterface[];
}

const Assignment = ({ userRole, lines }: AssignmentInterface) => {
  const [toggleReassign, setToggleReassign] = useState(false);
  
  return (
    <>
      <PrimaryButton
        type="button"
        handleOnCLick={() => {
          setToggleReassign(!toggleReassign);
        }}
        customClass="px-3"
      >
        Réasignations
      </PrimaryButton>
      {toggleReassign && (
        <div className=" border rounded bg-slate-900 p-3 flex flex-col">
          <button onClick={() => setToggleReassign(false)} aria-label="Fermer" className="relative ">
            {<XCircleIcon width={30} className="cursor-pointer absolute -top-7 -left-7" />}
          </button>
          <SecondaryTitle customClass="mb-3">Lignes</SecondaryTitle>
          <div className="gap-3 flex-wrap center">
            {lines.map((line) => (
              <PrimaryButton
                key={line.id}
                type="button"
                customClass="border w-12 focus:outline-none focus:ring focus:border-blue-300 focus:bg-indigo-900"
              >
                {line.name}
              </PrimaryButton>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Assignment;
