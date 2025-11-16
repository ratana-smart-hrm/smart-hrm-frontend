import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";

export const contractTypeCache = {
  clearAll: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.contractTypes.root,
    });
  },

  clearList: (queryClient: QueryClient) => {
    queryClient.removeQueries({
      queryKey: queryKeys.contractTypes.list(),
      exact: false,
    });
  },

  clearDetail: (queryClient: QueryClient, id?: number) => {
    queryClient.removeQueries({
      queryKey: queryKeys.contractTypes.detail(id),
    });
  },
};
