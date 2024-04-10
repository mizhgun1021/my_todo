import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Todo } from '../types/todo';

const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:8000/api';

interface DeleteResponse {
  success: boolean;
  error?: string;
}

export interface TodosState {
  todoList: Todo[];
  error: string;
}

// init state
const initialState = {
  todoList: [],
  error: '',
} as TodosState;

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.todoList =
        state.todoList.length === 0
          ? [action.payload]
          : state.todoList.map((todo) => {
              return todo._id === action.payload._id ? action.payload : todo;
            });
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todoList.push(action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todoList = state.todoList.filter((todo) => {
        return todo._id !== action.payload;
      });
    });
    builder.addMatcher(
      isAnyOf(
        fetchTodos.rejected,
        fetchTodo.rejected,
        createTodo.rejected,
        updateTodo.rejected,
        deleteTodo.rejected,
      ),
      (state, action) => {
        if (action.error.message !== undefined) {
          state.error = action.error.message;
        }
      },
    );
  },
});

export const fetchTodos = createAsyncThunk('get/todos', async () => {
  const response = await fetch(`${apiUrl}/todos`, {
    method: 'GET',
  });
  return (await response.json()) as Todo[];
});

export const fetchTodo = createAsyncThunk(
  'get/todo',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'GET',
      });
      if (response.ok) {
        return (await response.json()) as Todo;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTodo = createAsyncThunk(
  'create/todo',
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      if (response.ok) {
        return (await response.json()) as Todo;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTodo = createAsyncThunk(
  'update/todo',
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      if (response.ok) {
        return (await response.json()) as Todo[];
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'delete/todo',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asd: id }),
      });

      if (response.ok) {
        (await response.json()) as DeleteResponse;
        return id;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export default todoSlice.reducer;
