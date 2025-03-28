import { Post, Comment, BoardLike, Category } from '../types/board';

export const boardApi = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch('/api/board/list');
    if (!response.ok) {
      throw new Error('게시글 목록을 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await fetch(`/api/board/${id}`);
    if (!response.ok) {
      throw new Error('게시글을 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  getComments: async (boardId: number): Promise<Comment[]> => {
    const response = await fetch(`/api/board/${boardId}/comments`);
    if (!response.ok) {
      throw new Error('댓글을 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  toggleLike: async (boardId: number): Promise<BoardLike> => {
    const response = await fetch(`/api/board/${boardId}/like`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('좋아요 처리에 실패했습니다.');
    }
    return response.json();
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
    }
    return response.json();
  },
};
