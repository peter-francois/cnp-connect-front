import { useQuery } from "@tanstack/react-query";
import { getLines } from "../api/line.api";

export const useLinesList = () => {
  return useQuery({
    queryKey: ["lines"],
    queryFn: getLines,
    staleTime: 1000 * 60 * 100,
  });
};
