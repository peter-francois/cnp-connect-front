import { XCircleIcon } from "@heroicons/react/24/solid";
import SecondaryTitle from "../ui/SecondaryTitle";
import PrimaryButton from "../ui/PrimaryButton";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import { useState } from "react";
//import { useEffect, useState } from "react";
//import { getLines } from "../../api/line.api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { useLinesList } from "../../hooks/useLinesList";
//import Line from "../alert/Line";
import LinesList from "../alert/LinesList";
//import { newAssigmentSchema } from "../../types/formSchema/newAssigmentSchema";
import {
  newAssigmentCoordinatorSchema,
  type UseFormAssigmentCoordinator,
} from "../../types/formSchema/newAssigmentCoordinatorSchema";
import {
  newAssigmentConductorSchema,
  type UseFormNewAssigmentConductorSchema,
} from "../../types/formSchema/newAssigmentConductorSchema";

interface AssignmentInterface {
  currentUserRole: UserRolesEnum;
}

const Assignment = ({ currentUserRole }: AssignmentInterface) => {
  const [toggleReassign, setToggleReassign] = useState(false);
  const {
    register: coordinatorRegister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      currentUserRole == UserRolesEnum.conductor ? newAssigmentCoordinatorSchema : newAssigmentConductorSchema
    ),
  });

  const onValidate: SubmitHandler<UseFormAssigmentCoordinator | UseFormNewAssigmentConductorSchema> = (data) => {
    console.log(data);
  };

  // const {
  //   register: driverRegister,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(newAssigmentDriverSchema),
  // });

  const selectedLine: LineInterface[] = watch("lines");

  if (currentUserRole === UserRolesEnum.supervisor) {
    return null;
  }

  return (
    <>
      <PrimaryButton type="button" handleOnCLick={() => setToggleReassign(!toggleReassign)} customClass="px-3">
        Réasignations
      </PrimaryButton>
      {toggleReassign && (
        <div className="border rounded bg-slate-900 p-3 flex flex-col">
          {/* ici ce doit étre une form car je vais envoyé les donné au back useform et zod */}
          <button onClick={() => setToggleReassign(false)} aria-label="Fermer" className="relative ">
            <XCircleIcon width={30} className="cursor-pointer absolute -top-7 -left-7" />
          </button>
          <form onSubmit={handleSubmit(onValidate)}>
            {currentUserRole == UserRolesEnum.conductor ? (
              <>
                <SecondaryTitle customClass="mb-3 center">Sélectionnez une ligne puis un train</SecondaryTitle>
                <LinesList register={coordinatorRegister} type="radio" currentUserRole={currentUserRole} />
              </>
            ) : (
              <>
                <SecondaryTitle customClass="mb-3">Sélectionnez une ou plusieurs lignes</SecondaryTitle>
                <LinesList register={coordinatorRegister} type="checkbox" currentUserRole={currentUserRole} />
              </>
            )}
            <div className="w-full flex justify-center">
              <PrimaryButton customClass="w-50 mx-auto mt-5 px-5 py-2 text-center" type="submit">
                Envoyer
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Assignment;
