import { useAtom } from 'jotai';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { selectedCategoryAtom, selectedPostAtom, categoriesAtom, fetchCategoriesAtom } from '../store/boardAtoms';
import { CategoryType } from '../types/board';
import { useEffect } from 'react';

const Nav = styled.nav`
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const NavItem = styled.li<{ active: boolean }>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#007bff' : 'transparent')};
  color: ${(props) => (props.active ? '#ffffff' : '#333333')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#f0f0f0')};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LoginButton = styled.button`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const CategoryList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const CategoryItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${(props) => (props.isSelected ? '#007bff' : 'transparent')};
  color: ${(props) => (props.isSelected ? '#ffffff' : '#333333')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#0056b3' : '#f0f0f0')};
  }
`;

export const Navigation = () => {
  const [categories] = useAtom(categoriesAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [, setSelectedPost] = useAtom(selectedPostAtom);
  const [, fetchCategories] = useAtom(fetchCategoriesAtom);
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    setSelectedPost(null);
  };

  const handleLogin = () => {
    alert('로그인 기능은 추후 구현 예정입니다.');
  };

  return (
    <Nav>
      <CategoryList>
        <CategoryItem
          isSelected={!selectedCategory}
          onClick={() => setSelectedCategory(null)}
        >
          전체
        </CategoryItem>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            isSelected={selectedCategory?.id === category.id}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </CategoryItem>
        ))}
      </CategoryList>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
    </Nav>
  );
};
