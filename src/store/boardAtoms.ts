import { atom } from 'jotai';
import { Post, Category } from '../types/board';
import { boardApi } from '../api';

// 초기 상태
const initialPosts: Post[] = [];

export const postsAtom = atom<Post[]>(initialPosts);
export const categoriesAtom = atom<Category[]>([]);
export const selectedCategoryAtom = atom<Category | null>(null);
export const selectedPostAtom = atom<Post | null>(null);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// 게시글 목록을 가져오는 atom
export const fetchPostsAtom = atom(null, async (_, set) => {
  set(isLoadingAtom, true);
  set(errorAtom, null);
  try {
    const posts = await boardApi.getPosts();
    set(postsAtom, posts);
  } catch (error) {
    set(
      errorAtom,
      error instanceof Error
        ? error.message
        : '게시글 목록을 가져오는데 실패했습니다.'
    );
  } finally {
    set(isLoadingAtom, false);
  }
});

// 게시글 상세 정보를 가져오는 atom
export const fetchPostAtom = atom(null, async (_, set, id: number) => {
  set(isLoadingAtom, true);
  set(errorAtom, null);
  try {
    const post = await boardApi.getPost(id);
    set(selectedPostAtom, post);
  } catch (error) {
    set(
      errorAtom,
      error instanceof Error
        ? error.message
        : '게시글을 가져오는데 실패했습니다.'
    );
  } finally {
    set(isLoadingAtom, false);
  }
});

// 카테고리 목록을 가져오는 atom
export const fetchCategoriesAtom = atom(null, async (_, set) => {
  set(isLoadingAtom, true);
  set(errorAtom, null);
  try {
    const categories = await boardApi.getCategories();
    set(categoriesAtom, categories);
  } catch (error) {
    set(
      errorAtom,
      error instanceof Error
        ? error.message
        : '카테고리 목록을 가져오는데 실패했습니다.'
    );
  } finally {
    set(isLoadingAtom, false);
  }
});

// 필터링된 게시글 목록 atom 수정
export const filteredPostsAtom = atom((get) => {
  const posts = get(postsAtom);
  const selectedCategory = get(selectedCategoryAtom);

  if (!selectedCategory) {
    return posts;
  }

  return posts.filter((post) => post.categoryId === selectedCategory.id);
});
