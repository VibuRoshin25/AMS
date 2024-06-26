import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import EditModal from "./EditModal";
import { getDate } from "../utils/dateMethods";

export default function Recordstable({ selectedDate }) {
  const selDate = getDate(selectedDate.startDate);
  const roles = [
    "All Roles",
    "Junior Software Developer",
    "Senior Software Developer",
    "Manager",
    "MIS",
    "Intern",
    "Trainee",
    "HR",
    "System Admin",
    "Accountant",
    "IT Analyst",
  ];
  const departments = [
    "All Departments",
    "IT",
    "HR",
    "Accounts",
    "MIS",
    "Engineering",
  ];
  const statuses = [
    "All Statuses",
    "Work from home",
    "Work from office",
    "Absent",
    "Late arrival",
  ];

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
        // const attendanceRecord = attendance[selectedDate] || {};
        return {
          ...employee,
          ...attendance[selDate],
        };
      });

      console.log(selDate);
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

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <div className="container mx-auto pt-6">
      <div className="overflow-hidden rounded-xl">
        <div className="shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-sky-300 rounded-t-lg">
              <tr>
                <th className="py-3 px-2 sm:px-4 text-white text-center rounded-tl-lg">
                  ID
                </th>
                <th className="py-3 px-2 sm:px-6 text-white text-center">
                  Employee
                </th>
                <th className="py-3 px-2 sm:px-4 text-white text-center">
                  <select
                    value={selectedRole}
                    onChange={(e) =>
                      setSelectedRole(
                        e.target.value === "All Roles" ? "All" : e.target.value
                      )
                    }
                    className="p-1 sm:p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="py-3 px-2 sm:px-6 text-white text-center">
                  <select
                    value={selectedDepartment}
                    onChange={(e) =>
                      setSelectedDepartment(
                        e.target.value === "All Departments"
                          ? "All"
                          : e.target.value
                      )
                    }
                    className="p-1 sm:p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </th>

                <th className="py-3 px-2 sm:px-6 text-white text-center">
                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value === "All Statuses"
                          ? "All"
                          : e.target.value
                      )
                    }
                    className="p-1 sm:p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="py-3 px-2 sm:px-6 text-white text-center">
                  Check In
                </th>
                <th className="py-3 px-2 sm:px-6 text-white text-center">
                  Check Out
                </th>
                <th className="py-3 px-2 sm:px-6 text-white text-center rounded-tr-lg">
                  Work Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => {
                const status = updateStatusForLateArrival(
                  record.punchin,
                  record.status
                );
                let statusClasses =
                  "bg-green-200 text-green-500 py-1 px-3 rounded";
                if (status === "Absent") {
                  statusClasses = "bg-red-200 text-red-500 py-1 px-3 rounded";
                } else if (status === "Late arrival") {
                  statusClasses =
                    "bg-yellow-200 text-yellow-500 py-1 px-3 rounded";
                }

                return (
                  <tr key={record.id}>
                    <td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                      {record.id}
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {record.name}
                    </td>
                    <td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                      {record.role}
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {record.department}
                    </td>
                    <td
                      className={`py-2 px-2 sm:px-6 border-b border-gray-300 text-center`}
                    >
                      <button className={statusClasses}>{status}</button>
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {status === "Absent" ? "--" : record.punchin}
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {status === "Absent" ? "--" : record.punchout}
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {status === "Absent" ? "--" : record.duration}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePreviousPage} className="p-2">
          <FcPrevious size={24} />
        </button>
        <span className="text-gray-700">
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
  );
}
