import { Link } from "react-router";
import PrimaryButton from "../components/utils/PrimaryButton";
import StatusIsConnect from "../components/user/StatusIsConnect";
import UserLi from "../components/user/UserLi";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

// method => PATH
// path => api/v1/users/:userId
// method => GET
// path => api/v1/users/:userId

// -------
// Comments:
// Superviseur : peut sélectionner une ligne et attribuer un train disponible sur cette ligne à un conducteur.
// Superviseur : peut sélectionner des lignes disponibles pour un coordinateur.
// Coordinateur : peut sélectionner une ligne et attribuer un train disponible sur cette ligne à un conducteur.
// Conducteur : peut voir la ligne et le train qui lui sont affectés.
// Utilisateur connecté voir son profil et peut changer sa photo et son statut
const User = () => {
  const user = {
    name: "Peter",
    role: "sup",
    hiredAt: "2025",
    email: "email",
    status: true,
    ligne: ["A"],
    train: 56,
  };
  return (
    <div className="my-3  mx-auto">
      <section className="flex justify-around items-center gap-8 mb-4">
        <div  className="flex flex-col gap-3">
          <img
            className="rounded-full shadow-xl shadow-neutral-100/15"
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt="user lastName"
          />
          {/* input type file pour l'ajout de la nouvelle photo */}
          <Link className="text-sm" to={"/"}>
            Changer la photo
          </Link>
        </div>
        <ul>
          <UserLi label="Nom" value={user.name} />
          <UserLi label="Rôle" value={user.role} />
          <UserLi label="Embauché depuis le" value={user.hiredAt} />
        </ul>
      </section>
      <section>
        <ul>
          <UserLi label="Email" value={user.email} icon={<EnvelopeIcon width={20}></EnvelopeIcon>} />
          <UserLi label="Status" value={user.status} />
          <UserLi
            label="Affectation"
            value={
              user.ligne ? `Ligne${user.ligne.length == 1 ? "" : "s"} ${user.ligne.join(", ")}` : `Train ${user.train}`
            }
          />
        </ul>
      </section>
      <div className="flex flex-col gap-4 my-4 max-w-52 mx-auto">
        {/* soit lignes soit trains */}
        <PrimaryButton type="button">Lignes</PrimaryButton>
        <PrimaryButton type="button">Trains</PrimaryButton>
        <PrimaryButton type="submit">Réasignations</PrimaryButton>
        <PrimaryButton type="submit">Nouveau message</PrimaryButton>
      </div>
    </div>
  );
};

export default User;
