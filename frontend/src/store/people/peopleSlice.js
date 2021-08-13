import { createSlice } from '@reduxjs/toolkit'

const peopleSlice = createSlice({
  name: 'people',
  initialState: [],
  reducers: {
    updatePeople: (state, action) => {
      let count = 0

      if (action.payload) {
        const people = action.payload.map(person => {
          person.id = count++
          person.shortParty = person.party[0]
          return person
        })

        return people
      }

      return []
    }
  }
})

// Action creators are generated for each case reducer function
export const { updatePeople } = peopleSlice.actions

export default peopleSlice.reducer