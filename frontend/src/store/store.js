import { configureStore } from '@reduxjs/toolkit'
import userReducer from './account/userSlice'
import familyReducer from './account/familySlice'
import itemsReducer from './items/itemsSlice'
import itemReducer from './items/itemSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    family: familyReducer,
    items: itemsReducer,
    item: itemReducer
  }
})