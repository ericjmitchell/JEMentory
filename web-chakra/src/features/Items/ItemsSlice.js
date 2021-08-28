import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../app/config.json'

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/items`,
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

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],

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
    [fetchItems.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchItems.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      
      state.items = payload.items;
    },
    [fetchItems.rejected]: (state) => {
      console.log('fetchItems');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = itemsSlice.actions;

export const itemsSelector = (state) => state.items;