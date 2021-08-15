import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './account/userSlice';
import { familySlice } from './account/familySlice';
import { itemsSlice } from './items/itemsSlice';
import { itemSlice } from './items/itemSlice';
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    family: familySlice.reducer,
    items: itemsSlice.reducer,
    item: itemSlice.reducer,
  },
});