import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import PointSlice from "@/features/PointSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    points: PointSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
