import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/UserSlice';
import { itemsSlice } from '../features/Items/ItemsSlice';
import { itemSlice } from '../features/Item/ItemSlice';
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    items: itemsSlice.reducer,
    item: itemSlice.reducer,
  },
});
