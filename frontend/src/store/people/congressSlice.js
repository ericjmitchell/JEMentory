import { createSlice } from '@reduxjs/toolkit'

const congressSlice = createSlice({
  name: 'congress',
  initialState: "",
  reducers: {
    updateCongress: (state, action) => {
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateCongress } = congressSlice.actions

export default congressSlice.reducer