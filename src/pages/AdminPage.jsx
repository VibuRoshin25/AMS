import PageOutline from "../components/PageOutline";
import { selectCurrentUser } from "../store/authSlice";
import { selectFilters } from "../store/recordsFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminSummary from "../components/adminComponents/AdminSummary";
import AdminChart from "../components/adminComponents/AdminChart";
import { fetchRecords } from "../store/recordsFilterSlice";
import { useEffect } from "react";
import { fetchDepartments, selectDepartments } from "../store/departmentsSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { records } = useSelector(selectFilters);
  const departments = useSelector(selectDepartments);
  const selectedUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const currentDate = { startDate: new Date("2024-06-24") }; //gotta change
    dispatch(fetchRecords(currentDate));
    dispatch(fetchDepartments());
  }, [dispatch]);

  const totalEmployees = records.length;
  const employeesPresent = records.filter(
    (record) => record.status === "Full Day" || record.status === "Half Day"
  ).length;
  const employeesOnLeave = records.filter(
    (record) => record.status === "SL" || record.status === "CL"
  ).length;
  const employeesAbsent = totalEmployees - employeesPresent - employeesOnLeave;

  const departmentWisePresent = departments.map((department) => {
    return {
      department: department,
      count: records.filter(
        (record) =>
          record.department === department &&
          (record.status === "Full Day" || record.status === "Half Day")
      ).length,
    };
  });

  console.log(departmentWisePresent);
  console.log(selectedUser);
  return (
    <PageOutline>
      <div className="w-full flex items-start p-4">
        <h1 className="text-3xl font-bold">Welcome, {selectedUser.name}!</h1>
      </div>
      <div className="flex justify-items-stretch w-full gap-4 p-4 justify-stretch">
        <AdminSummary
          totalEmployees={totalEmployees}
          employeesPresent={employeesPresent}
          employeesAbsent={employeesAbsent}
          employeesOnLeave={employeesOnLeave}
        />
        <AdminChart departmentWisePresent={departmentWisePresent} />
      </div>
    </PageOutline>
  );
};

export default AdminPage;
