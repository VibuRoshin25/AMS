import useFetchCollection from "./hooks/useFetchCollection";

const LeavesPage = () => {
  const leaves = useFetchCollection("leaves");

  return (
    <div>
      <h2>Leave Policies</h2>
      <table>
        <thead>
          <tr>
            <th>Leave Code</th>
            <th>Leave Name</th>
            <th>Include Weekly Off</th>
            <th>Include Holiday</th>
            <th>Leave Type</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leave_code}</td>
              <td>{leave.leave_name}</td>
              <td>{leave.include_weekly_off ? "Yes" : "No"}</td>
              <td>{leave.include_holiday ? "Yes" : "No"}</td>
              <td>{leave.leave_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesPage;
