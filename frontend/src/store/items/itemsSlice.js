import { createSlice } from '@reduxjs/toolkit'

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    updateItems: (state, action) => {
      // let count = 0

      // if (action.payload) {
      //   const items = action.payload.map(item => {
      //     item.id = count++
      //     item.shortParty = item.party[0]
      //     return item
      //   })

      //   return items
      // }

      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateItems } = itemsSlice.actions

export default itemsSlice.reducer