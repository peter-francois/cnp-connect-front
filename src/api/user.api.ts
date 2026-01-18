import {
  type SafeUserWithLinesAndTrainsInterface,
  type SafeUserInterface,
  type CreateUserRequestInterface,
} from "../types/interfaces/UserInterface";
import { axiosClient } from "../utils/axiosClient";
import type { ResponseInterface } from "../types/interfaces/responseInterface.types";

const api = axiosClient();

export const getUsersApi = async (): Promise<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>> => {
  const { data } = await api.get<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>>("/users");
  return data;
};

export const getUsersByIdApi = async (id: string): Promise<SafeUserWithLinesAndTrainsInterface> => {
  const { data } = await api.get<SafeUserWithLinesAndTrainsInterface>(`/users/${id}`);
  return data;
};

export const updateUserByIdApi = async (
  dataToUpdate: Partial<SafeUserInterface>
): Promise<ResponseInterface<SafeUserInterface>> => {
  const { data } = await api.patch<ResponseInterface<SafeUserInterface>>(`/users/${dataToUpdate.id}`);
  return data;
};

export const updateAssigmentApi = async (
  dataToUpdate: SafeUserWithLinesAndTrainsInterface
): Promise<ResponseInterface<SafeUserWithLinesAndTrainsInterface>> => {
  const { data } = await api.patch<ResponseInterface<SafeUserWithLinesAndTrainsInterface>>(
    `/users/${dataToUpdate.id}/assignment`
  );
  return data
};

export const addUserApi = async (body: CreateUserRequestInterface): Promise<ResponseInterface<SafeUserInterface>> => {
  const { data } = await api.post<ResponseInterface<SafeUserInterface>>("/users", body);
  return data;
};
