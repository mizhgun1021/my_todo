import { RootState, useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { todoSlice } from '../features/todoSlice';
import { Snackbar } from '@mui/material';

const ErrorMessageComponent = () => {
  const dispatch = useAppDispatch();
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => {
        dispatch(todoSlice.actions.clearError());
      }, 3000); // Час в мілісекундах для закриття помилкі

      // Очистіть таймер, коли компонент буде демонтовано
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return error !== '' ? <Snackbar open={error !== ''} message={error} /> : null;
};

export default ErrorMessageComponent;
