import { Link } from "react-router";
import PrimaryButton from "../components/utils/PrimaryButton";
import StatusIsConnect from "../components/user/StatusIsConnect";

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
  return (
    <div className="my-3  mx-auto">
      <section className="flex justify-around items-center gap-4 mb-4">
        <div>
          <img className="rounded-full" src="https://randomuser.me/api/portraits/women/1.jpg" alt="user lastName" />
          <Link className="text-sm" to={"/"}>
            Changer la photo
          </Link>
        </div>
        <ul>
          <li>Nom: </li>
          <li>Rôle: </li>
          <li>Embauché depuis le:</li>
        </ul>
      </section>
      <section>
        <ul>
          <li>Email: </li>
          <li>Status: </li>
          <li>Affectation: </li>
        </ul>
      </section>
      <div className="flex flex-col gap-4 my-4 max-w-52 mx-auto">
        <PrimaryButton type="button">Lignes</PrimaryButton>
        <PrimaryButton type="button">Trains</PrimaryButton>
        <PrimaryButton type="submit">Réasignations</PrimaryButton>
        <PrimaryButton type="submit">Nouveau message</PrimaryButton>
      </div>
    </div>
  );
};

export default User;
