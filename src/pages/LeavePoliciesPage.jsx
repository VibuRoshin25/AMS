import StyledTH from "../components/StyledTH.jsx";
import StyledTD from "../components/StyledTD.jsx";
import Table from "../components/tables/Table.jsx";
import AddLeavePolicyModal from "../components/modals/AddLeavePolicyModal.jsx";
import PageOutline from "../components/PageOutline.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeavePolicies,
  selectLeaves,
} from "../store/leavePoliciesSlice.js";

const LeavePoliciesPage = () => {
  const dispatch = useDispatch();

  const leaves = useSelector(selectLeaves);

  useEffect(() => {
    dispatch(fetchLeavePolicies());
  }, [dispatch]);

  return (
    <>
      <PageOutline>
        <AddLeavePolicyModal />
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

export default LeavePoliciesPage;
