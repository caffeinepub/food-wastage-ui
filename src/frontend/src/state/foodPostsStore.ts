import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FoodPost {
  id: string;
  title: string;
  quantity: number;
  date: string;
  time: string;
  timestamp: number;
}

interface FoodPostsStore {
  posts: FoodPost[];
  isHydrated: boolean;
  addPost: (post: Omit<FoodPost, 'id' | 'timestamp'>) => void;
  getMostRecent: () => FoodPost | undefined;
  setHydrated: () => void;
}

export const useFoodPostsStore = create<FoodPostsStore>()(
  persist(
    (set, get) => ({
      posts: [],
      isHydrated: false,
      addPost: (post) => {
        const newPost: FoodPost = {
          ...post,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };
        set((state) => ({
          posts: [newPost, ...state.posts],
        }));
      },
      getMostRecent: () => {
        const posts = get().posts;
        return posts.length > 0 ? posts[0] : undefined;
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'food-posts-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
