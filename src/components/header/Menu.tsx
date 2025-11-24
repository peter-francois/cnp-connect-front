import { XMarkIcon } from "@heroicons/react/24/outline";
import type { LinkInterface } from "../../types/interfaces/linkInterfaces.types";
import ItemLink from "./ItemLink";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";

interface MenuComponentInterface {
  links: LinkInterface;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ links, isOpen, menuRef, setIsOpen }: MenuComponentInterface) => {
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className="h-screen border border-gray-400 rounded-2xl w-80 absolute top-0 left-0 bg-slate-950"
        >
          {/* 79px => Height of div minus border */}
          <div className="flex items-center justify-between border-b border-gray-400 px-4 h-[79px] mb-10">
            <h2>Menu</h2>
            <XMarkIcon width={30} className="bg-red-600 hover:bg-red-900 rounded-full" onClick={closeMenu} />
          </div>
          <nav>
            <ul className="flex flex-col gap-5 px-5">
              {me &&
                Object.entries(links.items).map(([key, item]) => {
                  return (
                    <ItemLink
                      link={item.path}
                      allowedRolesLink={item.allowedRoles}
                      key={key}
                      meUser={me}
                      handleOnClick={closeMenu}
                    >
                      {item.name}
                    </ItemLink>
                  );
                })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
