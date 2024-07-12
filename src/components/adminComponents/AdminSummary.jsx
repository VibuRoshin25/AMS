import AdminCard from "./AdminCard";

const AdminSummary = ({
  totalEmployees,
  employeesPresent,
  employeesAbsent,
  employeesOnLeave,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-1/2 gap-4 ">
      <AdminCard
        textClass=" text-blue-500"
        bgClass="bg-blue-500"
        label="Total Employees"
        value={totalEmployees}
      />
      <AdminCard
        textClass=" text-green-500 "
        bgClass="bg-green-500"
        label="Employees Present"
        value={employeesPresent}
      />
      <AdminCard
        textClass=" text-red-500 "
        bgClass="bg-red-500"
        label="Employees Absent"
        value={employeesAbsent}
      />
      <AdminCard
        textClass=" text-yellow-500 "
        bgClass="bg-yellow-500"
        label="Employees on Leave"
        value={employeesOnLeave}
      />
    </div>
  );
};

export default AdminSummary;
