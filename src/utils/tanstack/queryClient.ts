import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

// Création du client Query

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Les données restent "fraîches" pendant 1 minute
      staleTime: 60 * 1000,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
})


persistQueryClient({
  queryClient,
  persister: localStoragePersister,
})
