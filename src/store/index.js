import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import recordsFiltersReducer from "./recordsFilterSlice";
import userFiltersReducer from "./userFilterSlice";
import rolesReducer from "./rolesSlice";
import statusReducer from "./statusSlice";
import departmentsReducer from "./departmentsSlice";
import shiftPoliciesReducer from "./shiftPoliciesSlice";
import leavePoliciesReducer from "./leavePoliciesSlice";
import holidaysReducer from "./holidaysSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recordsFilters: recordsFiltersReducer,
    userFilters: userFiltersReducer,
    roles: rolesReducer,
    status: statusReducer,
    departments: departmentsReducer,
    shiftPolicies: shiftPoliciesReducer,
    leavePolicies: leavePoliciesReducer,
    holidays: holidaysReducer,
  },
});

export default store;
