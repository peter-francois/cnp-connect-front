import { useQuery } from "@tanstack/react-query";
import { getUsers, getUsersById } from "../api/user.api";

export const useUserService = () => {
  const FindManyWithLinesAndTrains = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      staleTime: 1000 * 60 * 5,
    });

  const FindUserDetails = (id: string) =>
    useQuery({
      queryKey: [`user${id}`],
      queryFn: () => getUsersById(id),
      staleTime: 1000 * 60 * 5,
    });

  return { findManyWithLinesAndTrains: FindManyWithLinesAndTrains, findUserDetails: FindUserDetails };
};
