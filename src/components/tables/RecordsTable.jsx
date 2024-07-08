import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, selectRoles } from "../../store/rolesSlice";
import { fetchStatuses, selectStatuses } from "../../store/statusSlice";
import {
  fetchDepartments,
  selectDepartments,
} from "../../store/departmentsSlice";
import {
  setSelectedRole,
  setSelectedDepartment,
  setSelectedStatus,
  fetchRecords,
  selectSelectedDate,
  selectSelectedName,
  selectFilters,
} from "../../store/recordsFilterSlice";
import EditModal from "../modals/EditModal";
import StyledTD from "../StyledTD";
import StyledTH from "../StyledTH";
import FieldSelector from "../FieldSelector";
import Table from "./Table";
import Loading from "../Loading";

export default function RecordsTable() {
  const dispatch = useDispatch();

  const selectedDate = useSelector(selectSelectedDate);
  const selectedName = useSelector(selectSelectedName);
  const { selectedRole, selectedDepartment, selectedStatus, records, loading } =
    useSelector(selectFilters);
  const roles = useSelector(selectRoles);
  const statuses = useSelector(selectStatuses);
  const departments = useSelector(selectDepartments);

  const [currentPage, setCurrentPage] = useState(1);

  console.log(roles);
  const recordsPerPage = 10;

  useEffect(() => {
    dispatch(fetchRecords(selectedDate));
    dispatch(fetchRoles());
    dispatch(fetchStatuses());
    dispatch(fetchDepartments());
  }, [selectedDate, dispatch]);

  const filteredRecords = records.filter((record) => {
    return (
      (selectedRole === "All" || record.role === selectedRole) &&
      (selectedDepartment === "All" ||
        record.department === selectedDepartment) &&
      (selectedStatus === "All" || record.status === selectedStatus) &&
      (selectedName === "" ||
        record.name.toLowerCase().includes(selectedName.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  if (loading) return <Loading />;

  return (
    <>
      <Table>
        <thead className="bg-sky-300 rounded-t-lg">
          <tr>
            <StyledTH className="rounded-tl-lg">ID</StyledTH>
            <StyledTH>Employee</StyledTH>
            <StyledTH>
              <FieldSelector
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value === "All Roles" ? "All" : e.target.value
                  )
                }
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </FieldSelector>
            </StyledTH>
            <StyledTH>
              <FieldSelector
                value={selectedDepartment}
                onChange={(e) =>
                  setSelectedDepartment(
                    e.target.value === "All Departments"
                      ? "All"
                      : e.target.value
                  )
                }
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </FieldSelector>
            </StyledTH>
            <StyledTH>
              <FieldSelector
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value === "All Statuses" ? "All" : e.target.value
                  )
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </FieldSelector>
            </StyledTH>
            <StyledTH>Punch In</StyledTH>
            <StyledTH>Punch Out</StyledTH>
            <StyledTH>Work Hours</StyledTH>
            <StyledTH className="rounded-tr-lg">Edit</StyledTH>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => {
            let statusClasses =
              "bg-green-200 text-green-500 py-1 px-3 rounded text-lg";
            if (record.status === "CL" || record.status === "SL") {
              statusClasses =
                "bg-red-200 text-red-500 w-1/2 py-1 px-3 rounded text-lg";
            } else if (record.status === "Half Day") {
              statusClasses =
                "bg-yellow-200 text-yellow-500 py-1 px-3 rounded text-lg";
            }
            return (
              <tr key={record.id}>
                <StyledTD>{record.id}</StyledTD>
                <StyledTD>{record.name}</StyledTD>
                <StyledTD>{record.role}</StyledTD>
                <StyledTD>{record.department}</StyledTD>
                <StyledTD>
                  <button className={statusClasses}>{record.status}</button>
                </StyledTD>
                <StyledTD>{record.punchin ? record.punchin : "--"}</StyledTD>
                <StyledTD>{record.punchout ? record.punchout : "--"}</StyledTD>
                <StyledTD>{record.duration ? record.duration : "--"}</StyledTD>
                <StyledTD>
                  <EditModal
                    item={record}
                    selectedDate={selectedDate.startDate}
                    disable={record.status ? false : true}
                  />
                </StyledTD>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={handlePreviousPage} className="p-2">
            <FcPrevious size={24} />
          </button>
          <span className="text-gray-700 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} className="p-2">
            <FcNext size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
