import { atom } from 'jotai';
import { Todo } from '../types/todo';

export const todosAtom = atom<Todo[]>([]);

export const addTodoAtom = atom(null, (get, set, text: string) => {
  const todos = get(todosAtom);
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  set(todosAtom, [...todos, newTodo]);
});

export const toggleTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
});

export const deleteTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.filter((todo) => todo.id !== id)
  );
});
