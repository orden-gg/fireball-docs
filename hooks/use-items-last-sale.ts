import { useQuery } from '@tanstack/react-query';
import type { GetItemsLastSaleQuery } from '@fireballgg/sdk/juiced-subgraph';

type ItemLastSale = GetItemsLastSaleQuery['items'][0];

interface ItemsLastSaleResponse {
  success: boolean;
  data: {
    items: ItemLastSale[];
  };
  message?: string;
}

export function useItemsLastSale() {
  return useQuery({
    queryKey: ['items-last-sale'],
    queryFn: async () => {
      const response = await fetch('/api/items-last-sale');
      if (!response.ok) {
        throw new Error('Failed to fetch items last sale');
      }
      const data: ItemsLastSaleResponse = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch items last sale');
      }
      return data.data.items;
    },
    staleTime: Infinity, // Data always stays fresh, never automatically refetches
    gcTime: Infinity, // Keep in cache forever
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
