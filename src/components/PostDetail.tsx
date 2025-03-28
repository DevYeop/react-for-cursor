import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  selectedPostAtom,
  fetchPostAtom,
  isLoadingAtom,
  errorAtom,
} from '../store/boardAtoms';
import { Comment } from '../types/board';
import { boardApi } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Header = styled.div`
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  color: #666666;
  font-size: 0.9rem;
`;

const Content = styled.div`
  line-height: 1.6;
  color: #333333;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
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

const CommentSection = styled.div`
  margin-top: 2rem;
  border-top: 2px solid #e0e0e0;
  padding-top: 2rem;
`;

const CommentTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const CommentList = styled.div`
  margin-top: 1rem;
`;

const CommentItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: #333333;
`;

const CommentDate = styled.span`
  color: #666666;
  font-size: 0.9rem;
`;

const CommentContent = styled.div`
  color: #333333;
  margin-left: 1rem;
`;

const CommentForm = styled.form`
  margin-top: 1rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  resize: vertical;
  min-height: 100px;
`;

const CommentSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  color: #666666;
  font-size: 0.9rem;
`;

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPost] = useAtom(selectedPostAtom);
  const [, fetchPost] = useAtom(fetchPostAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [error] = useAtom(errorAtom);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchPost(Number(id));
    }
  }, [id, fetchPost]);

  const loadComments = async (boardId: number) => {
    try {
      const fetchedComments = await boardApi.getComments(boardId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('댓글 로딩 에러:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // TODO: 댓글 작성 API 호출 구현
      setNewComment('');
      if (selectedPost) {
        loadComments(selectedPost.id);
      }
    } catch (error) {
      console.error('댓글 작성 에러:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return <LoadingMessage>게시글을 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!selectedPost) return null;

  return (
    <Container>
      <Header>
        <Title>{selectedPost.title}</Title>
        <MetaInfo>
          <span>작성자: {selectedPost.username}</span>
          <span>|</span>
          <span>카테고리: {selectedPost.categoryName}</span>
          <span>|</span>
          <span>
            작성일: {new Date(selectedPost.createdAt).toLocaleString()}
          </span>
        </MetaInfo>
        <Stats>
          <span>조회 {selectedPost.viewCount}</span>
          <span>좋아요 {selectedPost.likeCount}</span>
          <span>댓글 {selectedPost.commentCount}</span>
        </Stats>
      </Header>
      <Content>{selectedPost.content}</Content>

      <CommentSection>
        <CommentTitle>댓글</CommentTitle>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment.author.nickname}</CommentAuthor>
                <CommentDate>
                  {new Date(comment.createdAt).toLocaleString()}
                </CommentDate>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <CommentSubmitButton type="submit">댓글 작성</CommentSubmitButton>
        </CommentForm>
      </CommentSection>

      <BackButton onClick={handleBackClick}>목록으로</BackButton>
    </Container>
  );
};
