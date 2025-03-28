import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
import TestPage from './pages/TestPage';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
