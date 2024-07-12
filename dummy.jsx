import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const createEmployee = createAsyncThunk(
  "createEmployee/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const recordDoc = doc(db, "employees", data.id);
      await updateDoc(recordDoc, data);
      return data;
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
  reducers: {
    setSelectedName: (state, action) => {
      state.employee.name = action.payload;
    },
    setSelectedId: (state, action) => {
      state.employee.id = action.payload;
    },
    setSelectedDept: (state, action) => {
      state.employee.dept = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.employee.role = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.employee.email = action.payload;
    },
    setSelectedIsAdmin: (state, action) => {
      state.employee.isAdmin = action.payload;
    },
    setSelectedPassword: (state, action) => {
      state.employee.password = action.payload;
    },
    setSelectedAvailableLeaves: (state, action) => {
      state.employee.availableLeaves = action.payload;
    },
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

export const {
  setSelectedName,
  setSelectedId,
  setSelectedDept,
  setSelectedRole,
  setSelectedEmail,
  setSelectedIsAdmin,
  setSelectedPassword,
  setSelectedAvailableLeaves,
} = createEmployeeSlice.actions;

export const employeeData = (state) => state.createEmployee;

export default createEmployeeSlice.reducer;
