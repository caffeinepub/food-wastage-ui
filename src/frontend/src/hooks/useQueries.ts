import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FoodDonationPost, TrackingStep, Category } from '../backend';

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      location: string;
      foodType: string;
      state: string;
      quantity: number;
      expiryDate: string;
      pickupTime: string;
      image: string;
      category: Category;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      return actor.createPost(
        data.title,
        data.location,
        data.foodType,
        data.state,
        BigInt(data.quantity),
        data.expiryDate,
        data.pickupTime,
        data.image,
        data.category,
        data.description,
        null
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      queryClient.invalidateQueries({ queryKey: ['currentTracking'] });
    },
  });
}

export function useGetMyPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<FoodDonationPost[]>({
    queryKey: ['myPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPosts();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetMostRecentPost() {
  const { data: posts, isLoading, isFetched } = useGetMyPosts();

  const mostRecent = posts && posts.length > 0 ? posts[0] : null;

  return {
    data: mostRecent,
    isLoading,
    isFetched,
  };
}

export function useGetCurrentTracking() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TrackingStep[]>({
    queryKey: ['currentTracking'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCurrentTracking();
    },
    enabled: !!actor && !actorFetching,
  });
}
