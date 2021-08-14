import { createSlice } from '@reduxjs/toolkit'

const itemSlice = createSlice({
  name: 'item',
  initialState: {},
  reducers: {
    updateItem: (state, action) => {
      console.log(action)
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateItem } = itemSlice.actions

export default itemSlice.reducer