import { useEffect, useState } from "react";
import type { LineInterface } from "../../types/interfaces/line/LineInterface";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import SelectableInput from "../ui/SelectableInput";
import ErrorMessage from "./ErrorMessage";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";
import { useUserService } from "../../hooks/useUserService";

interface LinesListInterface {
  register: UseFormRegister<any>;
  type: string;
  handleSelectedLineFromChild?: (data: LineInterface[]) => void;
  isAlerts: boolean;
  registerError: FieldErrors;
  authenticateUserRole?: UserRolesEnum;
}

const LinesList = ({
  register,
  type,
  authenticateUserRole,
  handleSelectedLineFromChild,
  isAlerts,
  registerError,
}: LinesListInterface) => {
  const [selectLines, setSelectLines] = useState<LineInterface[]>([]);
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);
  const { findUserDetails } = useUserService();
  const { isPending, isError, data, error } = findUserDetails(String(me?.id));

  const isDriver = authenticateUserRole === UserRolesEnum.DRIVER;
  const driverLine = data?.trainTravel?.[0]?.travel?.line;

  // 🔹 Auto-selection driver
  useEffect(() => {
    if (isDriver && driverLine && selectLines.length === 0) {
      setSelectLines([driverLine]);
      handleSelectedLineFromChild?.([driverLine]);
    }
  }, [isDriver, driverLine]);

  const handleSelectLines = (line: LineInterface) => {
    if (isDriver) return;

    setSelectLines((prev) => {
      const exists = prev.some((l) => l.id === line.id);
      return exists ? prev.filter((l) => l.id !== line.id) : [...prev, line];
    });
  };

  if (isPending) return <span>Chargement...</span>;
  if (isError) return <span>Erreur : {error?.message}</span>;
  if (!data) return null;

  return (
    <>
      {/* Tout sélectionner pour non-driver */}
      {isAlerts && !isDriver && (
        <div className="flex gap-2">
          <button
            type="button"
            className="border border-indigo-600 rounded-lg py-2 px-3 my-3 hover:bg-indigo-400"
            onClick={() =>
              setSelectLines(
                selectLines.length === data.assignedLines.length
                  ? []
                  : data.assignedLines.map((al) => al.line)
              )
            }
          >
            {selectLines.length === data.assignedLines.length
              ? "Tout désélectionner"
              : "Tout sélectionner"}
          </button>
        </div>
      )}
      
      <div className="card-border justify-around relative flex flex-wrap gap-y-7 gap-x-2 p-5">
        {/* Driver : ligne auto-sélectionnée */}
        {isDriver && driverLine && (
          <SelectableInput
            key={driverLine.id}
            label="linesIds"
            data={driverLine}
            onClick={() => {}}
            isSelected={selectLines.some((item) => item.id === driverLine.id)}
            register={register}
            type={type}
            customClass="opacity-70 cursor-not-allowed"
          />
        )}

        {/* Non-driver : multi-selection */}
        {!isDriver &&
          data.assignedLines.map(({ line }) => (
            <SelectableInput
              key={line.id}
              label="linesIds"
              data={line}
              onClick={() => handleSelectLines(line)}
              isSelected={selectLines.some((item) => item.id === line.id)}
              register={register}
              type={type}
              customClass="size-10"
            />
          ))}
      </div>

      <ErrorMessage id="lines" errors={registerError} />
    </>
  );
};

export default LinesList;
