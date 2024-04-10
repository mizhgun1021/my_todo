import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from '../features/todoSlice';

export const store = configureStore({
  reducer: todosReducer,
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
