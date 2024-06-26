import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { db } from "./firebase/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import EditModal from "./EditModal";

const roles = [
  "All Roles",
  "Junior software developer",
  "Senior software developer",
  "Manager",
  "MIS",
  "Intern",
  "Trainee",
];
const departments = ["All Departments", "IT", "HR", "Accounts", "MIS"];
const statuses = [
  "All Statuses",
  "Work from home",
  "Work from office",
  "Absent",
  "Present",
];

export default function Recordstable() {
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
      const recordsCollection = collection(db, "employees");
      const recordsSnapshot = await getDocs(recordsCollection);
      const recordsList = recordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(recordsList);
    };

    fetchRecords();
  }, []);

  const calculateTotalHours = (checkin, checkout) => {
    const checkinTime = new Date(`01/01/2000 ${checkin}`);
    const checkoutTime = new Date(`01/01/2000 ${checkout}`);
    const diffInMs = checkoutTime - checkinTime;
    const diffInMinutes = diffInMs / (1000 * 60);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = Math.floor(diffInMinutes % 60);
    return `${hours} hrs ${minutes} mins`;
  };

  const updateStatusForLateArrival = (checkin, status) => {
    return checkin > "09:00 AM" ? "Late arrival" : status;
  };

  const filteredRecords = records.filter((record) => {
    return (
      (selectedRole === "All" || record.role === selectedRole) &&
      (selectedDepartment === "All" ||
        record.Department === selectedDepartment) &&
      (selectedStatus === "All" || record.Status === selectedStatus)
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
    <div className="shadow-lg rounded-lg w-[95%] flex flex-col justify-center items-center mt-12">
      <table className="min-w-full bg-white">
        <thead className="bg-sky-300 rounded-t-lg">
          <tr>
            <th className="py-4 px-2 sm:px-4 text-white text-center rounded-tl-lg text-lg">
              ID
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center text-lg">
              Employee
            </th>
            <th className="py-4 px-2 sm:px-4 text-white text-center text-lg">
              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value === "All Roles" ? "All" : e.target.value
                  )
                }
                className="p-2 sm:p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center text-lg">
              <select
                value={selectedDepartment}
                onChange={(e) =>
                  setSelectedDepartment(
                    e.target.value === "All Departments"
                      ? "All"
                      : e.target.value
                  )
                }
                className="p-2 sm:p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center text-lg">
              Date
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center text-lg">
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value === "All Statuses" ? "All" : e.target.value
                  )
                }
                className="p-2 sm:p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center text-lg">
              Check In
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center text-lg">
              Check Out
            </th>
            <th className="py-4 px-2 sm:px-6 text-white text-center rounded-tr-lg text-lg">
              Work Hours
            </th>
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
                <td className="py-4 px-2 sm:px-4 border-b border-gray-300 text-center text-lg">
                  {record.id}
                </td>
                <td className="py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg">
                  {record.Employee}
                </td>
                <td className="py-4 px-2 sm:px-4 border-b border-gray-300 text-center text-lg">
                  {record.role}
                </td>
                <td className="py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg">
                  {record.Department}
                </td>
                <td className="py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg">
                  {record.Date}
                </td>
                <td
                  className={`py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg`}
                >
                  <button className={statusClasses}>{status}</button>
                </td>
                <td className="py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg">
                  {status === "Absent" ? "--" : record.Checkin}
                </td>
                <td className="py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg">
                  {status === "Absent" ? "--" : record.CheckOut}
                </td>
                <td className="py-4 px-2 sm:px-6 border-b border-gray-300 text-center text-lg">
                  {status === "Absent"
                    ? "--"
                    : calculateTotalHours(record.Checkin, record.CheckOut)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center w-full mt-4 px-6">
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
  );
}
