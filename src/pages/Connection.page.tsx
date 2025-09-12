import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import { NavLink } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

interface ConnectionInterface {
  email: string;
  password: string;
}
const ConnectionPage = () => {
  const { register, handleSubmit } = useForm<ConnectionInterface>();

  const sendDataToBack = (data: ConnectionInterface): void => {
    console.log(data);
  };

  return (
    <>
      <PrimaryTitle>Connexion</PrimaryTitle>
      <form onSubmit={handleSubmit(sendDataToBack)} className="flex flex-col max-h-96 max-w-96 w-full px-5 gap-20">
        <div className="card-border ">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Adresse email"
            customClass="mt-0 mb-10"
            icon={
              <EnvelopeIcon
                width={20}
                {...register("email", {
                  required: true,
                  pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
                })}
              />
            }
          />
          <Input
            id="password"
            type="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            customClass="mt-0 mb-0"
            icon={<LockClosedIcon width={20} />}
            {...register("password", { required: true })}
          />
          <NavLink to="/" className="text-xs">
            Mot de passe oulié?{" "}
          </NavLink>
        </div>
        <PrimaryButton>Se connecter</PrimaryButton>
      </form>
    </>
  );
};

export default ConnectionPage;
