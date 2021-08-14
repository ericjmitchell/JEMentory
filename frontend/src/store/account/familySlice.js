import { createSlice } from '@reduxjs/toolkit'

const familySlice = createSlice({
  name: 'family',
  initialState: "",
  reducers: {
    updateFamily: (state, action) => {
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateFamily } = familySlice.actions

export default familySlice.reducer