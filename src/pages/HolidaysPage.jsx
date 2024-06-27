import StyledTH from "../components/StyledTH";
import StyledTD from "../components/StyledTD.jsx";
import Table from "../components/table/Table.jsx";
import PageOutline from "../components/PageOutline.jsx";
import AddHolidayModal from "../components/modals/AddHolidayModal.jsx";
import useFetchCollection from "../hooks/UseFetchCollection.jsx";

const HolidaysPage = () => {
  const holidays = useFetchCollection("holidays");

  return (
    <>
      <PageOutline>
        <AddHolidayModal />
        <Table>
          <thead className="bg-sky-300 rounded-t-lg">
            <tr>
              <StyledTH>Holiday Name</StyledTH>
              <StyledTH>Date</StyledTH>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id}>
                <StyledTD>{holiday.name}</StyledTD>
                <StyledTD>{holiday.id}</StyledTD>
              </tr>
            ))}
          </tbody>
        </Table>
      </PageOutline>
    </>
  );
};

export default HolidaysPage;
