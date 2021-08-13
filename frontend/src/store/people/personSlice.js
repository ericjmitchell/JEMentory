import { createSlice } from '@reduxjs/toolkit'

const personSlice = createSlice({
  name: 'person',
  initialState: {},
  reducers: {
    updatePerson: (state, action) => {
      console.log(action)
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updatePerson } = personSlice.actions

export default personSlice.reducer