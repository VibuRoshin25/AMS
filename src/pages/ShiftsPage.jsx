import useFetchCollection from "../hooks/UseFetchCollection";
import StyledTH from "../components/StyledTH";
import StyledTD from "../components/StyledTD.jsx";
import Table from "../components/Table.jsx";
import AddLeaveModal from "../components/modals/AddLeaveModal.jsx";
import PageOutline from "../components/PageOutline.jsx";

const ShiftsPage = () => {
  const shifts = useFetchCollection("shifts");

  return (
    <>
      <PageOutline>
        <AddLeaveModal />
        <Table>
          <thead className="bg-sky-300 rounded-t-lg">
            <tr>
              <StyledTH>Shift Code</StyledTH>
              <StyledTH>Shift Name</StyledTH>
              <StyledTH>Start Time</StyledTH>
              <StyledTH>End Time</StyledTH>
              <StyledTH>Hours</StyledTH>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <StyledTD>{shift.id}</StyledTD>
                <StyledTD>{shift.name}</StyledTD>
                <StyledTD>{shift.startTime}</StyledTD>
                <StyledTD>{shift.endTime}</StyledTD>
                <StyledTD>{shift.hours}</StyledTD>
              </tr>
            ))}
          </tbody>
        </Table>
      </PageOutline>
    </>
  );
};

export default ShiftsPage;
