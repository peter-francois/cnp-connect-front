import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";

interface LinkComponentInterface {
  link: string;
  allowedRolesLink: UserRolesEnum[] | undefined;
  meUser: SafeUserInterface;
  children: ReactNode;
  handleOnClick: () => void;
}

const ItemLink = ({ link, children, allowedRolesLink, meUser, handleOnClick }: LinkComponentInterface) => {
  return (
    <NavLink
      to={link}
      onClick={handleOnClick}
      className={({ isActive }) =>
        `text-indigo-50 px-4 py-2.5 rounded-2xl hover:text-indigo-500 ${isActive && "text-indigo-500 underline"} ${
          !allowedRolesLink?.includes(meUser.role) && "hidden"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default ItemLink;
