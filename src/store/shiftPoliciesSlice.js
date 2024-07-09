import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchShiftPolicies = createAsyncThunk(
  "shiftPolicies/fetchShiftPolicies",
  async () => {
    const querySnapshot = await getDocs(collection(db, "shifts"));
    const shiftData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return shiftData;
  }
);

const shiftPoliciesSlice = createSlice({
  name: "shiftPolicies",
  initialState: {
    shifts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setShifts: (state, action) => {
      state.shifts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShiftPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShiftPolicies.fulfilled, (state, action) => {
        state.shifts = action.payload;
        state.loading = false;
      })
      .addCase(fetchShiftPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setShifts } = shiftPoliciesSlice.actions;
export const selectShifts = (state) => state.shiftPolicies.shifts;
export default shiftPoliciesSlice.reducer;
