import { atom } from 'jotai';

export interface User {
  username: string;
  email: string;
  nickname: string;
}

// 사용자 정보를 저장하는 atom
export const userAtom = atom<User | null>(null);

// 로그인 상태를 확인하는 atom
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);

// 초기 상태 설정을 위한 atom
export const initializeAuthAtom = atom(null, (get, set) => {
  // 로컬 스토리지에서 토큰 확인
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    set(userAtom, null);
    return;
  }

  // TODO: 토큰을 사용하여 사용자 정보를 가져오는 API 호출
  // 현재는 토큰이 있으면 로그인된 것으로 간주
});
