import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (user) => {
    if (user) {
      const q = query(
        collection(db, "employees"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          uid: user.uid,
          email: user.email,
          type: doc.data().type,
          userId: doc.id,
        };
      }
      throw new Error("No such document!");
    }
    return null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: true,
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setCurrentUser, setLoading } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
