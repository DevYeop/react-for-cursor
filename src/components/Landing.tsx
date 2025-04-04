import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: #074ee8;
  min-height: 100vh;
  color: #ffffff;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1127px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 800;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  max-width: 800px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 16px 0;
`;

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  max-width: 800px;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #bc31ea;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 16px;
`;

const LoginButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export function Landing() {
  return (
    <Container>
      <LoginButton to="/login">로그인</LoginButton>
      <Badge>FREE DEMO</Badge>
      <ContentWrapper>
        <Header>
          <Title>Lo-fi Wireframe Kit</Title>
          <Subtitle>
            Please enjoy this free demo version of Lo-fi Wireframe Kit. The full
            kit can be found on Figma Community 👉🏻.
          </Subtitle>
        </Header>

        <Section>
          <SectionTitle>🌐 lofiwireframekit.com</SectionTitle>
          <Text>
            Learn more about this kit at lofiwireframekit.com
            <br />
            Made by Dave Whitley ©2023 davewhitley.com
          </Text>
        </Section>

        <Section>
          <SectionTitle>💡 Feedback and help</SectionTitle>
          <Text>
            Want to leave feedback? Found a bug? Feel free to email or contact
            me on Twitter.
            <br />
            dave@davewhitley.com @davecave
          </Text>
        </Section>

        <Section>
          <SectionTitle>💕️ Support the creator</SectionTitle>
          <Text>
            If you find this kit useful, consider purchasing the full version!
            You'd be supporting new components and future updates.
            <br />
            <StyledLink to="#">Support 👉🏻</StyledLink>
          </Text>
        </Section>
      </ContentWrapper>
    </Container>
  );
}
