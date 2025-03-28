export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
  ENDPOINTS: {
    BOARD: {
      LIST: '/board/list',
      DETAIL: (id: number) => `/board/${id}`,
      COMMENTS: (id: number) => `/board/${id}/comments`,
      LIKES: (id: number) => `/board/${id}/likes`,
    },
  },
} as const;
