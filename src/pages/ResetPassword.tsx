import { EnvelopeIcon } from "@heroicons/react/24/solid";
import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";

const ResetPassword = () => {
  return (
    <>
      <PrimaryTitle>Réinitialiser mot de passe</PrimaryTitle>

      <form className="w-90">
        <div className="card-border relative"><span className="absolute w-6 top-19.5 left-9">{<EnvelopeIcon />}</span>
          <Input
            id="email"
            type="email"
            placeholder="Veuillez rentrer votre email"
            label="Email"
            icon=""
          />
        </div>
        <PrimaryButton customClass="mt-20">Envoyer</PrimaryButton>
      </form>
    </>
  );
};

export default ResetPassword;
