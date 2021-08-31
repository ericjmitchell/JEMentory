import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../app/config.json'

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/users`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    showPassword: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.showPassword = false;

      return state;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },
    [fetchUser.rejected]: (state) => {
      console.log('fetchUser');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState, setShowPassword } = userSlice.actions;

export const userSelector = (state) => state.user;