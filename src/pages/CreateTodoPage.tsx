import { Todo } from '../types/todo';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTodo } from '../features/todoSlice';
import { useAppDispatch } from '../app/store';

const CreateTodoPage: React.FC = () => {
  const [todo, setTodo] = useState<Todo>({
    _id: '',
    name: '',
    description: '',
    progress: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: name === 'progress' ? parseInt(value, 10) : value,
    });
  };

  const dispatch = useAppDispatch();
  const handleAddTodo = (e: any) => {
    e.preventDefault();
    const newTodo: Todo = {
      _id: Date.now().toString(),
      description: todo.description,
      name: todo.name,
      progress: todo.progress,
    };

    void dispatch(createTodo(newTodo));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Створити Нове Завдання
      </Typography>
      <form onSubmit={handleAddTodo}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="name"
          label="Назва"
          value={todo.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="description"
          label="Опис"
          value={todo.description}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="progress"
          label="Прогрес"
          type="number"
          value={todo.progress}
          onChange={handleInputChange}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Створити
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTodoPage;
