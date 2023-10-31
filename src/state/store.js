import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import facilitySlice from "./facilitySlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    facilities: facilitySlice.reducer,
  },
});

export default store;
