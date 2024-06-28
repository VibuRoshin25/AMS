import useFetchCollection from "../hooks/UseFetchCollection.jsx";
import StyledTH from "../components/StyledTH";
import StyledTD from "../components/StyledTD.jsx";
import Table from "../components/table/Table.jsx";
import AddLeaveModal from "../components/modals/AddLeaveModal.jsx";
import PageOutline from "../components/PageOutline.jsx";

const LeavesPage = () => {
  const leaves = useFetchCollection("leaves");
  console.log(leaves);

  return (
    <>
      <PageOutline>
        <AddLeaveModal />
        <Table>
          <thead className="bg-sky-300 rounded-t-lg">
            <tr>
              <StyledTH>Policy Code</StyledTH>
              <StyledTH>Policy Name</StyledTH>
              <StyledTH>Include Weekly Off</StyledTH>
              <StyledTH>Include Holiday</StyledTH>
              <StyledTH>Policy Type</StyledTH>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <StyledTD>{leave.id}</StyledTD>
                <StyledTD>{leave.name}</StyledTD>
                <StyledTD>{leave.includeWeeklyOff ? "Yes" : "No"}</StyledTD>
                <StyledTD>{leave.includeHoliday ? "Yes" : "No"}</StyledTD>
                <StyledTD>{leave.type}</StyledTD>
              </tr>
            ))}
          </tbody>
        </Table>
      </PageOutline>
    </>
  );
};

export default LeavesPage;
