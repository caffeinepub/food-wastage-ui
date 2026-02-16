import { type ReactNode, useEffect } from 'react';
import { useFoodPostsStore } from './foodPostsStore';

interface FoodPostsProviderProps {
  children: ReactNode;
}

export function FoodPostsProvider({ children }: FoodPostsProviderProps) {
  const isHydrated = useFoodPostsStore((state) => state.isHydrated);

  useEffect(() => {
    // Ensure hydration is marked complete
    useFoodPostsStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
