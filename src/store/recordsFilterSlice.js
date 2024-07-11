import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getDate } from "../utils/dateMethods";

const currentDate = new Date();

export const fetchRecords = createAsyncThunk(
  "recordsFilters/fetchRecords",
  async (selectedDate) => {
    const employeesCollection = collection(db, "employees");
    const attendanceCollection = collection(db, "attendance");
    const selDate = getDate(selectedDate.startDate);

    console.log(selDate);
    const [employeesSnapshot, attendanceSnapshot] = await Promise.all([
      getDocs(employeesCollection),
      getDocs(attendanceCollection),
    ]);

    const employeesList = employeesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const attendanceList = attendanceSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const employeeMap = new Map(employeesList.map((item) => [item.id, item]));
    const attendanceMap = new Map(
      attendanceList.map((item) => [item.id, item])
    );

    return [...attendanceMap.keys()].map((id) => {
      const employee = employeeMap.get(id) || {};
      const attendance = attendanceMap.get(id) || {};
      return {
        ...employee,
        ...attendance[selDate],
      };
    });
  }
);

export const updateRecord = createAsyncThunk(
  "recordsFilters/updateRecord",
  async (updatedRecord) => {
    const recordDoc = doc(db, "attendance", updatedRecord.id);
    await updateDoc(recordDoc, updatedRecord);
    return updatedRecord;
  }
);

const recordsFiltersSlice = createSlice({
  name: "recordsFilters",
  initialState: {
    selectedDate: {
      startDate: getDate(currentDate),
      endDate: getDate(currentDate),
    },
    selectedName: "",
    selectedRole: "All",
    selectedDepartment: "All",
    selectedStatus: "All",
    records: [],
    loading: false,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedName: (state, action) => {
      state.selectedName = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecords.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.records = state.records.map((record) =>
          record.id === action.payload.id ? action.payload : record
        );
        state.loading = false;
      })
      .addCase(updateRecord.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedDate,
  setSelectedName,
  setSelectedRole,
  setSelectedDepartment,
  setSelectedStatus,
} = recordsFiltersSlice.actions;

export const selectFilters = (state) => state.recordsFilters;
export const selectSelectedDate = (state) => state.recordsFilters.selectedDate;
export const selectSelectedName = (state) => state.recordsFilters.selectedName;

export default recordsFiltersSlice.reducer;
