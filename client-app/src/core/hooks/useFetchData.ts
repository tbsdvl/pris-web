import { useQuery } from "@tanstack/react-query";
import { get } from "../services/api.service";
import { useAcquireToken as useToken } from "./useToken";

export function useFetchData(url: string) {
  const token = useToken();
  
  const result = useQuery({
    queryKey: [url, token],
    queryFn: async () => {
      if (!token) {
        return Promise.resolve(null);
      }
      const response = await get(url, token);
      return response?.data;
    },
    enabled: !!token,
  });

  return result.data;
}