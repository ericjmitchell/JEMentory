import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from './people/peopleSlice'
import personReducer from './people/personSlice'
import congressReducer from './people/congressSlice'

export default configureStore({
  reducer: {
    people: peopleReducer,
    person: personReducer,
    congress: congressReducer
  }
})