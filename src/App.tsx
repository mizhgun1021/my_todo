import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import CreateTodoPage from './pages/CreateTodoPage';
import EditTodoPage from './pages/EditTodoPage';
import Layout from './components/Layout';
import ErrorMessageComponent from './components/Error';

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/check" element={<div>123</div>} />
          <Route index element={<TodoListPage />} />
          <Route path="/todo/new" element={<CreateTodoPage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ErrorMessageComponent />
    </div>
  );
};

export default App;
