import styled from 'styled-components';

const TestContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const TestSection = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const TestTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const TestDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TestPage = () => {
  return (
    <TestContainer>
      <TestSection>
        <TestTitle>오픈그래프 테스트</TestTitle>
        <TestDescription>
          이 페이지는 오픈그래프 메타 태그를 테스트하기 위한 페이지입니다. 소셜
          미디어에서 공유될 때 미리보기가 어떻게 표시되는지 확인할 수 있습니다.
        </TestDescription>
      </TestSection>

      <TestSection>
        <TestTitle>테스트 이미지</TestTitle>
        <img
          src="https://picsum.photos/800/400"
          alt="테스트 이미지"
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </TestSection>

      <TestSection>
        <TestTitle>테스트 컨텐츠</TestTitle>
        <TestDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </TestDescription>
      </TestSection>
    </TestContainer>
  );
};

export default TestPage;
