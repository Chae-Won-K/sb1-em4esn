import { create } from 'zustand';
import { Post } from '../types';
import { FilterOptions } from '../components/SearchFilters';

interface PostStore {
  posts: Post[];
  filteredPosts: Post[];
  addPost: (post: Post) => void;
  removePost: (id: string) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  filterPosts: (filters: FilterOptions, userLocation: { lat: number; lng: number }) => void;
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // 지구의 반경 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  filteredPosts: [],
  addPost: (post) =>
    set((state) => ({ posts: [...state.posts, post], filteredPosts: [...state.posts, post] })),
  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      filteredPosts: state.filteredPosts.filter((post) => post.id !== id),
    })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
      filteredPosts: state.filteredPosts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      ),
    })),
  filterPosts: (filters, userLocation) =>
    set((state) => ({
      filteredPosts: state.posts.filter((post) => {
        // 카테고리 필터
        if (filters.category !== 'all' && post.category !== filters.category) {
          return false;
        }

        // 거리 필터
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          post.location.lat,
          post.location.lng
        );
        if (distance > filters.distance) {
          return false;
        }

        // 날짜 필터
        const postDate = new Date(post.createdAt);
        if (filters.dateRange.start && new Date(filters.dateRange.start) > postDate) {
          return false;
        }
        if (filters.dateRange.end && new Date(filters.dateRange.end) < postDate) {
          return false;
        }

        // 키워드 필터
        if (
          filters.keyword &&
          !post.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
          !post.content.toLowerCase().includes(filters.keyword.toLowerCase())
        ) {
          return false;
        }

        return true;
      }),
    })),
}));