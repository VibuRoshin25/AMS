import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const rolesDocRef = doc(db, "constants", "roles");
  const rolesDocSnap = await getDoc(rolesDocRef);

  if (rolesDocSnap.exists()) {
    const data = rolesDocSnap.data();
    return [...data.role];
  }
  throw new Error("Data not found");
});

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setRoles } = rolesSlice.actions;
export const selectRoles = (state) => state.roles.roles;
export default rolesSlice.reducer;
