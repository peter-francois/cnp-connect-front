import { EnvelopeIcon } from "@heroicons/react/24/solid";
import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";

const ResetPassword = () => {
  return (
    <>
      <PrimaryTitle>Réinitialiser mot de passe</PrimaryTitle>

      <form className="w-90">
        <div className="card-border relative">
          <Input
            id="email"
            type="email"
            placeholder="Veuillez rentrer votre email"
            label="Email"
            icon={<EnvelopeIcon width={20} />}
          />
        </div>
        <PrimaryButton customClass="mt-20">Envoyer</PrimaryButton>
      </form>
    </>
  );
};

export default ResetPassword;
