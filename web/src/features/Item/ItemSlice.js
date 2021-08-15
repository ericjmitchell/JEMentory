import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../app/config.json'

export const fetchItem = createAsyncThunk(
  'item/fetchItem',
  async ({ token, itemId }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/items/${itemId}`,
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

export const saveItem = createAsyncThunk(
  'item/saveItem',
  async ({ token, item }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/items`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item)
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        return {};
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async ({ token, itemId }, thunkAPI) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/items/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        return {};
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    id: null,
    name: '',
    category: '',
    amount: 0,
    unit: '',
    daysPerUnit: 0,
    lastPrice: 0,
    purchaseAmount: 0,
    purchaseDate: null,
    store: '',
    tax: false,

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
    [fetchItem.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchItem.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      
      state.id = payload.id;
      state.name = payload.name;
      state.category = payload.category;
      state.amount = payload.amount;
      state.unit = payload.unit;
      state.daysPerUnit = payload.daysPerUnit;
      state.lastPrice = payload.lastPrice;
      state.purchaseAmount = payload.purchaseAmount;
      state.purchaseDate = payload.purchaseDate;
      state.store = payload.store;
      state.tax = payload.tax;
    },
    [fetchItem.rejected]: (state) => {
      console.log('fetchItem');
      state.isFetching = false;
      state.isError = true;
    },

    [saveItem.pending]: (state) => {
      state.isFetching = true;
    },
    [saveItem.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [saveItem.rejected]: (state) => {
      console.log('saveItem');
      state.isFetching = false;
      state.isError = true;
    },

    [deleteItem.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteItem.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      clearState();
    },
    [deleteItem.rejected]: (state) => {
      console.log('deleteItem');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = itemSlice.actions;

export const itemSelector = (state) => state.item;