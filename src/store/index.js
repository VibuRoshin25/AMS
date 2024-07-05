import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminFiltersReducer from "./adminFilterSlice";
import userFiltersReducer from "./userFilterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminFilters: adminFiltersReducer,
    userFilters: userFiltersReducer,
  },
});

export default store;
