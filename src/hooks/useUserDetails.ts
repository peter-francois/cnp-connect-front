import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUsersById } from "../api/user.api";
import type { SafeUserWithLinesAndTrainsInterface } from "../types/interfaces/UserInterface";

export const useUserDetails = (id: string): UseQueryResult<SafeUserWithLinesAndTrainsInterface> => {
  return useQuery({
    queryKey: [`user${id}`],
    queryFn: () => getUsersById(id),
    staleTime: 1000 * 60 * 5,
  });
};
