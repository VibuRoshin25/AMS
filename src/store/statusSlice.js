import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export const fetchStatuses = createAsyncThunk(
  "status/fetchStatuses",
  async () => {
    const statusDocRef = doc(db, "constants", "statuses");
    const statusDocSnap = await getDoc(statusDocRef);

    if (statusDocSnap.exists()) {
      const data = statusDocSnap.data();
      return [...data.status];
    }
    throw new Error("Data not found");
  }
);

const statusSlice = createSlice({
  name: "status",
  initialState: {
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
        state.loading = false;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setStatuses } = statusSlice.actions;
export const selectStatuses = (state) => state.status.statuses;
export default statusSlice.reducer;
