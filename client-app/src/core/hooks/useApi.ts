import { useQuery } from "@tanstack/react-query";
import { get } from "../services/api.service";
import { useAcquireToken } from "./useAcquireToken";

export function useApi(url: string) {
  const token = useAcquireToken();
  
  const result = useQuery({
    queryKey: [url, token],
    queryFn: () => {
      if (!token) {
        return Promise.resolve(null);
      }
      return get(url, token).then((data) => {
        console.log(data);
        return data?.data;
      });
    },
    enabled: !!token,
  });

  return result.data;
}