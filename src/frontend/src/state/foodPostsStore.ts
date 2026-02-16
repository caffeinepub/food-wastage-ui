import { create } from 'zustand';

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
  addPost: (post: Omit<FoodPost, 'id' | 'timestamp'>) => void;
  getMostRecent: () => FoodPost | undefined;
}

export const useFoodPostsStore = create<FoodPostsStore>((set, get) => ({
  posts: [],
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
}));
