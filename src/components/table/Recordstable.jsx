import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { roles, departments, statuses } from "../../utils/constants";
import EditModal from "../modals/EditModal";
import StyledTD from "../StyledTD";
import StyledTH from "../StyledTH";
import FieldSelector from "../FieldSelector";
import Table from "./Table";
import { getDate } from "../../utils/dateMethods";

export default function Recordstable({ selectedDate }) {
  const [records, setRecords] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editRecord, setEditRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recordsPerPage = 10;

  useEffect(() => {
    const fetchRecords = async () => {
      const employeesCollection = collection(db, "employees");
      const attendanceCollection = collection(db, "attendance");
      const selDate = getDate(selectedDate.startDate);

      const [employeesSnapshot, attendanceSnapshot] = await Promise.all([
        getDocs(employeesCollection),
        getDocs(attendanceCollection),
      ]);

      const employeesList = employeesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const attendanceList = attendanceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const employeeMap = new Map(employeesList.map((item) => [item.id, item]));
      const attendanceMap = new Map(
        attendanceList.map((item) => [item.id, item])
      );

      const combinedRecords = [...attendanceMap.keys()].map((id) => {
        const employee = employeeMap.get(id) || {};
        const attendance = attendanceMap.get(id) || {};
        return {
          ...employee,
          ...attendance[selDate],
        };
      });

      console.log(combinedRecords);
      setRecords(combinedRecords);
    };

    fetchRecords();
  }, [selectedDate]);

  const updateStatusForLateArrival = (punchin, status) => {
    return punchin > "09:00 AM" ? "Late arrival" : status;
  };

  const filteredRecords = records.filter((record) => {
    return (
      (selectedRole === "All" || record.role === selectedRole) &&
      (selectedDepartment === "All" ||
        record.department === selectedDepartment) &&
      (selectedStatus === "All" || record.status === selectedStatus)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleEditClick = (record) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedRecord) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

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
            <StyledTH>Check In</StyledTH>
            <StyledTH>Check Out</StyledTH>
            <StyledTH>Work Hours</StyledTH>
            <StyledTH className="rounded-tr-lg">Edit</StyledTH>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => {
            const status = updateStatusForLateArrival(
              record.Checkin,
              record.Status
            );
            let statusClasses =
              "bg-green-200 text-green-500 py-1 px-3 rounded text-lg";
            if (status === "Absent") {
              statusClasses =
                "bg-red-200 text-red-500 py-1 px-3 rounded text-lg";
            } else if (status === "Late arrival") {
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
                  <button className={statusClasses}>{status}</button>
                </StyledTD>
                <StyledTD>
                  {status === "Absent" ? "--" : record.punchin}
                </StyledTD>
                <StyledTD>
                  {status === "Absent" ? "--" : record.punchout}
                </StyledTD>
                <StyledTD>
                  {status === "Absent" ? "--" : record.duration}
                </StyledTD>
                <StyledTD>
                  <button
                    onClick={() => handleEditClick(record)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
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
        {isModalOpen && (
          <EditModal
            item={editRecord}
            onSave={handleSaveEdit}
            onClose={closeEditModal}
          />
        )}
      </div>
    </>
  );
}
