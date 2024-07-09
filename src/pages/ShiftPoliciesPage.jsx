import StyledTH from "../components/StyledTH.jsx";
import StyledTD from "../components/StyledTD.jsx";
import Table from "../components/tables/Table.jsx";
import AddShiftPolicyModal from "../components/modals/AddShiftPolicyModal.jsx";
import PageOutline from "../components/PageOutline.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShiftPolicies,
  selectShifts,
} from "../store/shiftPoliciesSlice.js";

const ShiftPoliciesPage = () => {
  const dispatch = useDispatch();

  const shifts = useSelector(selectShifts);
  useEffect(() => {
    dispatch(fetchShiftPolicies());
  }, [dispatch]);

  return (
    <>
      <PageOutline>
        <AddShiftPolicyModal />
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

export default ShiftPoliciesPage;
