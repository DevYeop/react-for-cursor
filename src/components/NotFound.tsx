import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>페이지를 찾을 수 없습니다</h1>
      <button onClick={() => navigate('/')}>홈으로 가기</button>
    </Container>
  );
};
