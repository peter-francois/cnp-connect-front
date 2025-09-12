import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import { NavLink, useNavigate } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import PopUp from "../components/utils/PopUp";
import { Connection } from "../api/auth";
import { useState } from "react";
import { schema } from "../types/connection.formData";
import { zodResolver } from "@hookform/resolvers/zod";

export interface ConnectionInterface {
  email: string;
  password: string;
}
const ConnectionPage = () => {
  const [isSucces, setIsSucess] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnectionInterface>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const sendDataToBack = async (data: ConnectionInterface): Promise<void> => {
    console.log(data);
    const auth = await Connection(data.email, data.password);
    if (auth.authtoken) {
      setIsSucess(true);
      navigate("/utilisateurs");
    } else {
      setIsSucess(false);
    }
  };

  return (
    <>
      <PrimaryTitle>Connexion</PrimaryTitle>
      <form onSubmit={handleSubmit(sendDataToBack)} className="form">
        <div className="card-border ">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Adresse email"
            customClass="mt-0 mb-10"
            register={register}
            errors={errors}
            icon={<EnvelopeIcon width={20} />}
          />
          <Input
            id="password"
            type="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            customClass="mt-0 mb-0"
            register={register}
            errors={errors}
            icon={<LockClosedIcon width={20} />}
          />
          <NavLink to="/" className="text-xs">
            Mot de passe oulié?{" "}
          </NavLink>
        </div>
        {!isSucces && <PopUp>L'email et/ou le mot de passe est incorrect !</PopUp>}
        <PrimaryButton type="submit">Se connecter</PrimaryButton>
      </form>
    </>
  );
};

export default ConnectionPage;

// faire le connection.formdata.ts
