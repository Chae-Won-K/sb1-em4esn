export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'review' | 'info' | 'qa' | 'chat' | 'tips' | 'poll' | 'social';
  location: {
    lat: number;
    lng: number;
  };
  author: User;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  interests: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}