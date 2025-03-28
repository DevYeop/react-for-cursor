import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  todosAtom,
  addTodoAtom,
  toggleTodoAtom,
  deleteTodoAtom,
} from '../store/todoAtoms';

export const TodoList = () => {
  const [todos] = useAtom(todosAtom);
  const [, addTodo] = useAtom(addTodoAtom);
  const [, toggleTodo] = useAtom(toggleTodoAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">할 일 목록</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 할 일을 입력하세요"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            추가
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 text-blue-500"
              />
              <span
                className={todo.completed ? 'line-through text-gray-500' : ''}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
