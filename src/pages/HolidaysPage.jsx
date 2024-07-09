import StyledTH from "../components/StyledTH";
import StyledTD from "../components/StyledTD.jsx";
import Table from "../components/tables/Table.jsx";
import PageOutline from "../components/PageOutline.jsx";
import AddHolidayModal from "../components/modals/AddHolidayModal.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays, selectHolidays } from "../store/holidaysSlice.js";

const HolidaysPage = () => {
  const dispatch = useDispatch();

  const holidays = useSelector(selectHolidays);
  useEffect(() => {
    dispatch(fetchHolidays());
  }, [dispatch]);

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
