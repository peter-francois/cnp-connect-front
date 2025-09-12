import { getUsers } from "./user";

interface ResponseInterface {
  status: boolean;
  message: string;
  authtoken: boolean;
}

export const Connection = async (email: string, password: string): Promise<ResponseInterface> => {
  let token = false;
  try {
    const users = await getUsers();
    const user = users.find((item) => item.email === email);
    if (user && user.password == password) {
      token = true;
      return { status: true, message: `Connexion établie pour l'utilisateur ${user.email}`, authtoken: token };
    }
    return { status: false, message: "Connexion refusée", authtoken: token };
  } catch (error) {
    console.log(error);
    return { status: false, message: `Connexion refusé`, authtoken: token };
  }
};
