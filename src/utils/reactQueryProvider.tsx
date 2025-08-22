// components/Providers/ReactQueryProvider.tsx
"use client";

import { useState, type ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query";

interface ReactQueryProviderProps {
  children: ReactNode;
  config?: QueryClientConfig;
}

export default function ReactQueryProvider({
  children,
  config,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
