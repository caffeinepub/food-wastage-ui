import { type ReactNode } from 'react';

interface FoodPostsProviderProps {
  children: ReactNode;
}

export function FoodPostsProvider({ children }: FoodPostsProviderProps) {
  return <>{children}</>;
}
