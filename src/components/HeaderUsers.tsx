import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchBar from "./utils/SearchBar";
import { useState } from "react";
import { Link } from "react-router";

interface HeaderUsersInterface {
    search: string;
    setSearch: (value: string) => void;
}
const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}    
const HeaderUsers = ({search,setSearch}: HeaderUsersInterface) => {

  const [appUser] = useState(true);
  return (
    <div className="flex justify-around items-center">
      <form onSubmit={handleSubmit} className="relative block w-full max-w-md">
        <span className="absolute top-7 left-2">
          <MagnifyingGlassIcon width={20} />
        </span>
        <SearchBar value={search} onChange={setSearch} />
      </form>
      {appUser && <Link to="/">Ajouter un utilisateur</Link>}
    </div>
  );
};

export default HeaderUsers;
