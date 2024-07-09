import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchHolidays = createAsyncThunk(
  "holidays/fetchHolidays",
  async () => {
    const querySnapshot = await getDocs(collection(db, "holidays"));
    const holidayData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return holidayData;
  }
);

const holidaysSlice = createSlice({
  name: "holidays",
  initialState: {
    holidays: [],
    loading: false,
    error: null,
  },
  reducers: {
    setHolidays: (state, action) => {
      state.holidays = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.holidays = action.payload;
        state.loading = false;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setHolidays } = holidaysSlice.actions;
export const selectHolidays = (state) => state.holidays.holidays;
export default holidaysSlice.reducer;
