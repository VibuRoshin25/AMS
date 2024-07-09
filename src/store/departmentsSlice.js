import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const departmentsDocRef = doc(db, "constants", "departments");
    const departmentsDocSnap = await getDoc(departmentsDocRef);

    if (departmentsDocSnap.exists()) {
      const data = departmentsDocSnap.data();
      return ["All Departments", ...data.department];
    }
    throw new Error("Data not found");
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
        state.loading = false;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDepartments } = departmentsSlice.actions;
export const selectDepartments = (state) => state.departments.departments;
export default departmentsSlice.reducer;
