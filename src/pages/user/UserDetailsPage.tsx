import { EnvelopeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router";
import StatusIsConnected from "../../components/user/StatusIsConnected";
import UserField from "../../components/user/UserField";
import PrimaryButton from "../../components/utils/PrimaryButton";
import SecondaryTitle from "../../components/utils/SecondaryTitle";
import { useEffect, useState } from "react";
import { getUsersById } from "../../api/user.api";
import type { UserInterface } from "../../types/interfaces/UserInterface";
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

const UserDetailsPage = () => {
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

  return currentUser ? (
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
          <UserField label="Nom" value={currentUser.firstName} />
          <UserField label="Rôle" value={currentUser.role} />
          <UserField label="Embauché depuis le" value={currentUser.hiringAt} />
        </ul>
      </section>

      <section>
        <ul>
          <UserField label="Email" value={currentUser.email} icon={<EnvelopeIcon width={20}></EnvelopeIcon>} />
          <UserField
            label="Statut"
            value={
              <div className="flex gap-3">
                <p>Connecté</p>
                <StatusIsConnected status={currentUser.isActif}></StatusIsConnected>
              </div>
            }
          />
          <UserField
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
  ) : (
    <span>Aucun utilisateur touvé</span>
  );
};

export default UserDetailsPage;
