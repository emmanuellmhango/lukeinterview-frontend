import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facilities: [],
};
const facilitySlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    setFacilities: (state, action) => {
      state.facilities = action.payload;
    },
  },
});

export const { setFacilities } = facilitySlice.actions;
export default facilitySlice;
