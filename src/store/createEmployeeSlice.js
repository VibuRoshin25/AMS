import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const createEmployee = createAsyncThunk(
  "createEmployee/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const recordDoc = doc(db, "employees", data.id);
      await setDoc(recordDoc, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createEmployeeSlice = createSlice({
  name: "createEmployee",
  initialState: {
    employee: {
      name: "",
      id: "",
      dept: "",
      role: "",
      email: "",
      isAdmin: false,
      availableLeaves: 0,
      password: "",
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
        state.loading = false;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const employeeData = (state) => state.createEmployee;

export default createEmployeeSlice.reducer;
