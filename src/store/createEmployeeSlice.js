import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const createEmployee = createAsyncThunk(
  "createEmployee/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const recordDoc = doc(db, "attendance", data.id);
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
      password: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setName: (state, action) => {
      state.employee.name = action.payload;
    },
    setId: (state, action) => {
      state.employee.id = action.payload;
    },
    setDept: (state, action) => {
      state.employee.dept = action.payload;
    },
    setRole: (state, action) => {
      state.employee.role = action.payload;
    },
    setEmail: (state, action) => {
      state.employee.email = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.employee.isAdmin = action.payload;
    },
    setPassword: (state, action) => {
      state.employee.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setName,
  setId,
  setDept,
  setRole,
  setEmail,
  setIsAdmin,
  setPassword,
} = createEmployeeSlice.actions;

export const employeeData = (state) => state.createEmployee;

export default createEmployeeSlice.reducer;
