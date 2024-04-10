import { Todo } from '../types/todo';
import React from 'react';
import Typography from '@mui/material/Typography';
import {
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TodoCard: React.FC<{ todo: Todo }> = ({ todo }) => {
  const navigate = useNavigate();

  return (
    <Paper
      style={{ cursor: 'pointer' }}
      elevation={3}
      onClick={() => {
        navigate(`/todo/${todo._id}`);
      }}
    >
      <Card variant="outlined" style={{ backgroundColor: '#202020' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="h2" className="my-card-header">
              {todo.name}
            </Typography>
            <br />
            <LinearProgress variant="determinate" value={todo.progress} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  );
};

export default TodoCard;
