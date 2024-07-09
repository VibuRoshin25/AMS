import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchLeavePolicies = createAsyncThunk(
  "leavePolicies/fetchLeavePolicies",
  async () => {
    const querySnapshot = await getDocs(collection(db, "leaves"));
    const leaveData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return leaveData;
  }
);

const leavePoliciesSlice = createSlice({
  name: "leavePolicies",
  initialState: {
    leaves: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLeaves: (state, action) => {
      state.leaves = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeavePolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeavePolicies.fulfilled, (state, action) => {
        state.leaves = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeavePolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLeaves } = leavePoliciesSlice.actions;
export const selectLeaves = (state) => state.leavePolicies.leaves;
export default leavePoliciesSlice.reducer;
