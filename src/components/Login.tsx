import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { userAtom } from '../store/authAtoms';
import { authApi } from '../api/auth';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0052a3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #0066cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Login = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      console.log('Login response:', response);

      if (response.success) {
        localStorage.setItem('accessToken', response.token);

        setUser({
          username: formData.username,
          email: '',
          nickname: formData.username,
        });

        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error instanceof Error ? error.message : '로그인에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <InputGroup>
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SignupLink>
          <Link to="/signup">계정이 없으신가요? 회원가입하기</Link>
        </SignupLink>
      </Form>
    </Container>
  );
};
