import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useEffect } from 'react';
import {
  filteredPostsAtom,
  selectedPostAtom,
  fetchPostsAtom,
  isLoadingAtom,
  errorAtom,
} from '../store/boardAtoms';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333333;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
  background-color: #f8f9fa;
  color: #333333;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  color: #333333;
`;

const Tr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
`;

const Stats = styled.span`
  color: #666666;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const MetaInfo = styled.div`
  color: #666666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const PostItem = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const PostList = () => {
  const [posts] = useAtom(filteredPostsAtom);
  const [, setSelectedPost] = useAtom(selectedPostAtom);
  const [, fetchPosts] = useAtom(fetchPostsAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [error] = useAtom(errorAtom);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  if (isLoading) {
    return <LoadingMessage>게시글 목록을 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>카테고리</Th>
            <Th>작성자</Th>
            <Th>작성일</Th>
            <Th>조회</Th>
            <Th>좋아요</Th>
            <Th>댓글</Th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
              <Td>{post.id}</Td>
              <Td>{post.title}</Td>
              <Td>{post.categoryName}</Td>
              <Td>{post.username}</Td>
              <Td>{new Date(post.createdAt).toLocaleString()}</Td>
              <Td>
                {post.viewCount}
                <Stats>조회</Stats>
              </Td>
              <Td>
                {post.likeCount}
                <Stats>좋아요</Stats>
              </Td>
              <Td>
                {post.commentCount}
                <Stats>댓글</Stats>
              </Td>
            </PostItem>
          ))}
        </tbody>
      </Table>
      <MetaInfo>
        <span>작성자: {posts[0]?.username}</span>
        <span>|</span>
        <span>카테고리: {posts[0]?.categoryName}</span>
        <span>|</span>
        <span>작성일: {new Date(posts[0]?.createdAt).toLocaleString()}</span>
      </MetaInfo>
    </Container>
  );
};
