import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import { NavLink } from "react-router";



const ConnectionPage = () => {
    return (
        <>
          <PrimaryTitle customClass="mb-3">Connexion</PrimaryTitle> 
          <form >
            <div className="card-border pb-10 p-5">
                <Input id='email' type='email' label='Email' placeholder="Adresse email" customClass="mt-0 mb-10"></Input>
                <Input id='password' type='password' label='Mot de passe' placeholder="Mot de passe" customClass="mt-0 mb-0"></Input>
                <NavLink to='/' className="text-xs">Mot de passe oulié? </NavLink>
            </div>
            <PrimaryButton customClass="mt-15">Se connecter</PrimaryButton>
          </form>
        </>
    );
};

export default ConnectionPage;