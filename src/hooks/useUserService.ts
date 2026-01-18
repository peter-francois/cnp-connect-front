import { useMutation, useQuery } from "@tanstack/react-query";
import { addUserApi, getUsersApi, getUsersByIdApi, updateAssigmentApi, updateUserByIdApi } from "../api/user.api";
import type { CreateUserRequestInterface, SafeUserInterface, SafeUserWithLinesAndTrainsInterface } from "../types/interfaces/UserInterface";

export const useUserService = () => {
  const FindManyWithLinesAndTrains = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: getUsersApi,
      staleTime: 1000 * 60 * 5,
    });

  const FindUserDetails = (id: string) =>
    useQuery({
      queryKey: [`user${id}`],
      queryFn: () => getUsersByIdApi(id),
      staleTime: 1000 * 60 * 5,
    });

  const UpdateProfile = () =>
    useMutation({
      mutationFn: (newData: Partial<SafeUserInterface>) => updateUserByIdApi(newData),
    });

  const CreateUser = () =>
    useMutation({
      mutationFn: (data: CreateUserRequestInterface) => addUserApi(data),
    });

  const UpdateAssignment = () =>
    useMutation({
      mutationFn: (data: SafeUserWithLinesAndTrainsInterface) => updateAssigmentApi(data),
    });

  return {
    findManyWithLinesAndTrains: FindManyWithLinesAndTrains,
    findUserDetails: FindUserDetails,
    updateProfile: UpdateProfile,
    createUser: CreateUser,
    updateAssignment: UpdateAssignment
  };
};
