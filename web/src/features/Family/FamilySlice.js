import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../app/config.json'

export const fetchFamily = createAsyncThunk(
  'family/fetchFamily',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/family`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token,
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

export const familySlice = createSlice({
  name: 'family',
  initialState: {
    name: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchFamily.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchFamily.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.name = payload.name;
    },
    [fetchFamily.rejected]: (state) => {
      console.log('fetchFamily');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = familySlice.actions;

export const familySelector = (state) => state.family;