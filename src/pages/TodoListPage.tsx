import { Todo } from '../types/todo';

import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/store';

import { TodosState, fetchTodos } from '../features/todoSlice';
import { Fab, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TodoCard from '../components/TodoCard';

const TodoListPage: React.FC = () => {
  const navigate = useNavigate();

  const todos = useSelector<TodosState>((state) => {
    return state.todoList;
  }) as Todo[];

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchTodos());
  }, []);

  return (
    <Container>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        className="my-top-header"
      >
        Список Завдань
      </Typography>
      <Grid container spacing={2}>
        {todos.map((todo) => (
          <Grid item xs={12} lg={6} key={todo._id}>
            <TodoCard todo={todo} />
          </Grid>
        ))}
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => navigate('/todo/new')}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grid>
    </Container>
  );
};

export default TodoListPage;
