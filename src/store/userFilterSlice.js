import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getDate } from "../utils/dateMethods";

const currentDate = new Date();
const oneMonthAgo = new Date(currentDate);
oneMonthAgo.setMonth(currentDate.getMonth() - 1);

export const fetchUserData = createAsyncThunk(
  "userFilters/fetchUserData",
  async (userId) => {
    const userDocRef = doc(db, "employees", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    }
    throw new Error("User data not found");
  }
);

export const fetchAttendanceRecords = createAsyncThunk(
  "userFilters/fetchAttendanceRecords",
  async ({ userId }) => {
    const attendanceDocRef = doc(db, "attendance", userId);
    const attendanceDocSnap = await getDoc(attendanceDocRef);

    if (attendanceDocSnap.exists()) {
      const data = attendanceDocSnap.data();
      const attendanceArray = Object.entries(data).map(([id, details]) => ({
        id,
        ...details,
      }));
      return attendanceArray;
    }
    throw new Error("Attendance records not found");
  }
);

const userFiltersSlice = createSlice({
  name: "userFilters",
  initialState: {
    selectedDates: {
      startDate: getDate(oneMonthAgo),
      endDate: getDate(currentDate),
    },
    punchInTime: null,
    punchOutTime: null,
    totalDuration: null,
    status: null,
    userData: {},
    attendanceRecords: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDates: (state, action) => {
      state.selectedDates = action.payload;
    },
    setPunchinTime: (state, action) => {
      state.punchInTime = action.payload;
    },
    setPunchOutTime: (state, action) => {
      state.punchOutTime = action.payload;
    },
    setTotalDuration: (state, action) => {
      state.totalDuration = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
        state.attendanceRecords = action.payload;
        state.loading = false;
      })
      .addCase(fetchAttendanceRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedDates,
  setPunchinTime,
  setPunchOutTime,
  setTotalDuration,
  setStatus,
} = userFiltersSlice.actions;

export default userFiltersSlice.reducer;
