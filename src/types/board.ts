export interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  createdAt: string;
}

export interface Category {
  id: bigint;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  boardId: number;
  userId: number;
  parentId: number | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  replies?: Comment[];
}

export interface BoardLike {
  id: number;
  boardId: number;
  userId: number;
  createdAt: string;
}

export type CategoryType = Category;
