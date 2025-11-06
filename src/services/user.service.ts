import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUsers } from "../api/user.api";
import type { SafeUserWithLinesAndTrainsInterface } from "../types/interfaces/UserInterface";
import type { ResponseInterface } from "../types/interfaces/responseInterface.types";

class UserService {
  findManyWithLinesAndTrains(): UseQueryResult<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>, Error> {
    return useQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      staleTime: 1000 * 60 * 5,
    });
  }
}

export const userService = new UserService();
