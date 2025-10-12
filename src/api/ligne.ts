import axios from "axios";
import type { LigneInterface } from "../interfaces/LigneInterface";

const url = "/data/ligne.json";

export const getlignes = async (): Promise<LigneInterface[]> => {
  try {
    const res = await axios.get<LigneInterface[]>(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getligneById = async (id: number): Promise<LigneInterface | null> => {
  try {
    const lignes = await getlignes();
    const ligne = lignes.find((item) => item.id === id) ?? null;
    return ligne;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
