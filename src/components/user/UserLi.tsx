import type { JSX, ReactNode } from "react";
import PrimaryButton from "../utils/PrimaryButton";
import type { UserRolesEnum } from "../../enum/UserEnum";

interface UserLiInterface {
  label: string;
  value: string | boolean | JSX.Element | UserRolesEnum;
  icon?: ReactNode;
}

const UserLi = ({ label, value, icon }: UserLiInterface) => {
  return (
    <li className="my-2.5">
      <div className="flex justify-between">
        <p className="font-bold mb-1">{label}: </p>
        {icon && (
          <PrimaryButton type="button" customClass="px-2 relative right-0">
            {icon}
          </PrimaryButton>
        )}
      </div>
      <div className="pl-2">{value}</div>
    </li>
  );
};

export default UserLi;
