import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import recordsFiltersReducer from "./recordsFilterSlice";
import userFiltersReducer from "./userFilterSlice";
import rolesReducer from "./rolesSlice";
import statusReducer from "./statusSlice";
import departmentsReducer from "./departmentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recordsFilters: recordsFiltersReducer,
    userFilters: userFiltersReducer,
    roles: rolesReducer,
    status: statusReducer,
    departments: departmentsReducer,
  },
});

export default store;
