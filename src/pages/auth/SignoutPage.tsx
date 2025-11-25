import { useNavigate } from "react-router";
import { signoutApi } from "../../api/auth.api";
import { useEffect } from "react";

const SignoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignout = async (): Promise<void> => {
      await signoutApi();
      localStorage.clear()
      navigate("/");
    };
    handleSignout();
  }, [navigate]);

  return <p>Déconnexion en cours...</p>;
};

export default SignoutPage;
