import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Todo } from '../types/todo';
import { useSelector } from 'react-redux';
import { deleteTodo, fetchTodo, TodosState } from '../features/todoSlice';
import { IconButton, LinearProgress } from '@mui/material';
import { useAppDispatch } from '../app/store';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined) {
      void dispatch(fetchTodo(id));
    }
  }, [id]);

  const todos = useSelector<TodosState>((state) => {
    return state.todoList;
  }) as Todo[];

  const history = useNavigate();
  const todo = todos.find((element) => element._id === id);

  const handleDelete = (id: string) => {
    void dispatch(deleteTodo(id));
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        {todo === undefined ? (
          <Typography variant="h4" component="h1">
            Не знайдено
          </Typography>
        ) : (
          <>
            <Typography variant="h4" component="h1">
              {todo.name}
            </Typography>
            <Typography color="textSecondary">{todo.description}</Typography>
            <Box mt={2}>
              <Typography variant="subtitle1">
                Прогрес: {todo.progress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={todo.progress} />
            <Box
              mt={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => history(`/edit/${todo._id}`)}
              >
                Редагувати
              </Button>

              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(todo._id)}
                style={{ color: 'red' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default TodoDetailPage;
