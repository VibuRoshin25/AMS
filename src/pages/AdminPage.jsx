import PageOutline from "../components/PageOutline";
import { selectCurrentUser } from "../store/authSlice";
import AdminCard from "../components/AdminCard";
import { useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";

const AdminPage = () => {
  const selectedUser = useSelector(selectCurrentUser);
  console.log(selectedUser);
  return (
    <PageOutline>
      <div className="w-full flex items-start p-4">
        <h1 className="text-3xl font-bold">Welcome, {selectedUser.name}!</h1>
      </div>
      <div className="flex items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 p-4">
          <AdminCard
            className=" text-blue-500"
            label="Total Employees"
            value={22}
          />
          <AdminCard
            className=" text-green-500 "
            label="Employees Present"
            value={18}
          />
          <AdminCard
            className=" text-red-500 "
            label="Employees Absent"
            value={2}
          />
          <AdminCard
            className=" text-yellow-500 "
            label="Employees on Leave"
            value={2}
          />
        </div>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5], label: "Yesterday" },
            { data: [1, 6, 3], label: "Today" },
          ]}
          width={500}
          height={500}
        />
      </div>
    </PageOutline>
  );
};

export default AdminPage;
