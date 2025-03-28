import { User } from '../store/authAtoms';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  success: boolean;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || '로그인에 실패했습니다.');
    }

    return result;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }

    return response.json();
  },
};
