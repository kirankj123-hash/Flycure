'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error: Error & { status?: number }) => {
          // Don't retry on 4xx errors except 408, 429
          if (error?.status && error.status >= 400 && error.status < 500 && 
              error.status !== 408 && error.status !== 429) {
            return false;
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: (failureCount, error: Error & { status?: number }) => {
          // Don't retry on 4xx errors
          if (error?.status && error.status >= 400 && error.status < 500) {
            return false;
          }
          return failureCount < 2;
        },
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}