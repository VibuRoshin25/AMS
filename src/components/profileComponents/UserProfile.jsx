import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ProfileCard from "./ProfileCard";
import ProfilePhoto from "./ProfilePhoto";
ChartJS.register(ArcElement, Tooltip, Legend);
import ChangePhoto from "./ChangePhoto";
import Loading from "../Loading";

export default function UserProfile({ userId }) {
  const { userData, attendanceRecords, loading } = useSelector(
    (state) => state.userFilters
  );

  if (loading) return <Loading />;

  const presentDays = attendanceRecords.filter(
    (record) => record.status === "Present"
  ).length;
  const absentDays = attendanceRecords.filter(
    (record) => record.status === "Absent"
  ).length;
  const totalDays = new Date().getDate(); //Change this
  const availableLeaves = 20;

  const pieData = {
    labels: ["Present Days", "Absent Days", "Total Days"],
    datasets: [
      {
        label: "Attendance",
        data: [presentDays, absentDays, totalDays - presentDays - absentDays],
        backgroundColor: ["#10B981", "#EF4444", "#0EA5E9"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-3/3">
          <div className="flex justify-between">
            <div className="flex  items-center w-full justify-between">
              <div className="relative inline-block">
                <ProfilePhoto userId={userId} classnames="w-24 h-24" />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-sky-500">
                  {userData.name}
                </h2>
                <p className="text-gray-600">
                  {userData.role}, {userData.department}
                </p>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileCard
                bgClass="bg-sky-500"
                label="Total Days"
                value={totalDays}
              />
              <ProfileCard
                bgClass="bg-green-500"
                label="Days Present"
                value={presentDays}
              />
              <ProfileCard
                bgClass="bg-red-500"
                label="Days Absent"
                value={absentDays}
              />
              <ProfileCard
                bgClass="bg-yellow-500"
                label="Available Leaves"
                value={availableLeaves}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-3/3 flex justify-center items-center mt-6 lg:mt-0 lg:ml-6">
          <div style={{ width: "230px", height: "270px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
