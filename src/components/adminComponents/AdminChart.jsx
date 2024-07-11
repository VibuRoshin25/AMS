import { BarChart } from "@mui/x-charts/BarChart";

const AdminChart = ({ departmentWisePresent }) => {
  return (
    <div className="bg-white shadow-lg w-1/2 rounded-lg ">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: departmentWisePresent.map((d) => d.department),
          },
        ]}
        series={[
          { data: [4, 3, 5, 4], label: "Yesterday" },
          { data: departmentWisePresent.map((d) => d.count), label: "Today" },
        ]}
        height={500}
      />
    </div>
  );
};

export default AdminChart;
