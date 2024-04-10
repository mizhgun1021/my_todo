import { Todo } from '../types/todo';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TodosState, updateTodo } from '../features/todoSlice';
import { useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateTodoPage: React.FC = () => {
  const todos = useSelector<TodosState>((state) => {
    return state.todoList;
  }) as Todo[];

  const { id } = useParams<{ id: string }>();
  const todoServer = todos.find((element) => element._id === id);
  const toSave =
    todoServer === undefined
      ? {
          _id: Date.now().toString(),
          name: '',
          description: '',
          progress: 0,
        }
      : todoServer;

  const [todoClient, setTodo] = useState<Todo>(toSave);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({
      ...todoClient,
      [name]: name === 'progress' ? parseInt(value, 10) : value,
    });
  };

  const dispatch = useAppDispatch();
  const handleEditTodo = (e: any) => {
    e.preventDefault();
    const editTodo: Todo = {
      _id: todoClient._id,
      description: todoClient.description,
      name: todoClient.name,
      progress: todoClient.progress,
    };

    void dispatch(updateTodo(editTodo));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Створити Нове Завдання
      </Typography>
      <form onSubmit={handleEditTodo}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="name"
          label="Назва"
          value={todoClient.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="description"
          label="Опис"
          value={todoClient.description}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="progress"
          label="Прогрес"
          type="number"
          value={todoClient.progress}
          onChange={handleInputChange}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Редагувати
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTodoPage;
