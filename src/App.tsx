import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/category/:categoryId" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
