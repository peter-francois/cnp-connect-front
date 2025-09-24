import { Link, useParams } from "react-router";
import PrimaryButton from "../components/utils/PrimaryButton";
import UserLi from "../components/user/UserLi";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import SecondaryTitle from "../components/utils/Secondarytitle";
import StatusIsConnect from "../components/user/StatusIsConnect";
import { useEffect, useState } from "react";
import { getUsersById } from "../api/user";
import type { UserInterface } from "../interfaces/UsersInterface";

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
  const allLignes = ["A", "B", "C", "D"];
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const [toggleReassign, setToggleReassign] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const user = await getUsersById(Number(id));
      setCurrentUser(user);
    };
    getData();
  }, [id]);

  return (
    <div className="my-3">
      <section className="flex justify-around items-center gap-8 mb-4">
        <div className="flex flex-col gap-3">
          <img
            className="rounded-full shadow-xl shadow-neutral-100/15"
            src={currentUser?.avatar_url}
            alt={currentUser?.firstName}
          />
          {/* input type file pour l'ajout de la nouvelle photo */}
          <Link className="text-sm" to={"/"}>
            Changer la photo
          </Link>
        </div>
        <ul>
          <UserLi label="Nom" value={`${currentUser?.lastName} ${currentUser?.firstName}`} />
          <UserLi label="Rôle" value={`${currentUser?.role}`} />
          <UserLi
            label="Embauché depuis le"
            value={currentUser?.hiringAt ? new Date(currentUser.hiringAt).toLocaleDateString("fr-FR") : ""}
          />
        </ul>
      </section>

      <section>
        <ul>
          <UserLi label="Email" value={`${currentUser?.email}`} icon={<EnvelopeIcon width={20}></EnvelopeIcon>} />
          <UserLi
            label="Status"
            value={
              <div className="flex gap-3">
                <p>{currentUser?.isConnected ? "Connecté" : "Non connecté"}</p>
                <div
                  className={`rounded-full mt-1 ml-2 w-3 h-3 p-2 ${
                    currentUser?.isConnected ? "bg-green-600" : "bg-red-600"
                  }`}
                ></div>
              </div>
            }
          />
          <UserLi
            label="Affectation"
            value={
              currentUser?.lignesId
                ? `Ligne${currentUser?.lignesId?.length == 1 ? "" : "s"} ${currentUser?.lignesId?.join(", ")}`
                : `Train ${currentUser?.trainsId}`
            }
          />
        </ul>
      </section>
      <div className="flex flex-col gap-6 my-4 mx-auto">
        {/* boutton asignation: premiere étape affectations de la ligne puis assignation du trains */}

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
              {allLignes.map((ligne) => (
                <PrimaryButton
                  key={ligne}
                  type="button"
                  customClass="border w-12 focus:outline-none focus:ring focus:border-blue-300 focus:bg-indigo-900"
                >
                  {ligne}
                </PrimaryButton>
              ))}
            </div>
          </div>
        )}
        <PrimaryButton type="submit">Nouveau message</PrimaryButton>
      </div>
    </div>
  );
};

export default User;
