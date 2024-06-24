import React, { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { db } from "./firebase/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import EditModal from "./EditModal";

export default function Recordstable() {
  const roles = ["All Roles", "Junior Software Developer", "Senior Software Developer", "Manager", "MIS", "Intern", "Trainee", "HR", "System Admin", "Accountant", "IT Analyst"];
  const departments = ["All Departments", "IT", "HR", "Accounts", "MIS", "Engineering"];
  const statuses = ["All Statuses", "Work from home", "Work from office", "Absent", "Late arrival"];

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
      const recordsList = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecords(recordsList);
    };

    fetchRecords();
  }, []);

  const calculateTotalHours = (checkin, checkout) => {
    const checkinTime = new Date(`01/01/2000 ${checkin}`);
    const checkoutTime = new Date(`01/01/2000 ${checkout}`);
    const diffInMs = checkoutTime - checkinTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours.toFixed(2);
  };

  const updateStatusForLateArrival = (checkin, status) => {
    return checkin > "09:00 AM" ? "Late arrival" : status;
  };

  const filteredRecords = records.filter((record) => {
    return (
      (selectedRole === "All" || record.role === selectedRole) &&
      (selectedDepartment === "All" || record.department === selectedDepartment) &&
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
  const currentRecords = filteredRecords.slice(startIndex, startIndex + recordsPerPage);

  const openEditModal = (record) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditRecord(null);
    setIsModalOpen(false);
  };

  const handleSaveEdit = async (updatedData) => {
    // Update the record in Firebase
    const recordRef = doc(db, "employees", updatedData.id);
    await updateDoc(recordRef, {
      Checkin: updatedData.Checkin,
      Checkout: updatedData.Checkout,
      // Add other fields as needed
    });
    // Refresh records after update
    const updatedRecords = await getDocs(collection(db, "employees"));
    setRecords(updatedRecords.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    closeEditModal();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-sky-300 rounded-t-lg">
            <tr>
              <th className="py-3 px-4 text-white text-center rounded-tl-lg">ID</th>
              <th className="py-3 px-6 text-white text-center">Employee</th>
              <th className="py-3 px-4 text-white text-center">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value === "All Roles" ? "All" : e.target.value)}
                  className="p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </th>
              <th className="py-3 px-6 text-white text-center">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value === "All Departments" ? "All" : e.target.value)}
                  className="p-2 pr-0 border-none rounded bg-sky-500 text-white text-center"
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </th>
              <th className="py-3 px-6 text-white text-center">Date</th>
              <th className="py-3 px-6 text-white text-center">Status</th>
              <th className="py-3 px-6 text-white text-center">Check In</th>
              <th className="py-3 px-6 text-white text-center">Check Out</th>
              <th className="py-3 px-6 text-white text-center">Work Hours</th>
              <th className="py-3 px-6 text-white text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => {
              const status = updateStatusForLateArrival(record.Checkin, record.Status);
              let statusClasses = "bg-green-200 text-green-500 py-1 px-3 rounded";
              if (status === "Absent") {
                statusClasses = "bg-red-200 text-red-500 py-1 px-3 rounded";
              } else if (status === "Late arrival") {
                statusClasses = "bg-yellow-200 text-yellow-500 py-1 px-3 rounded";
              }

              return (
                <tr key={record.id}>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">{record.id}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{record.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">{record.role}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{record.department}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{record.Date}</td>
                  <td className={`py-2 px-6 border-b border-gray-300 text-center`}>
                    <button className={statusClasses}>
                      {status}
                    </button>
                  </td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{status === "Absent" ? "--" : record.Checkin}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{status === "Absent" ? "--" : record.CheckOut}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{status === "Absent" ? "--" : calculateTotalHours(record.Checkin, record.CheckOut)}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">
                    <button onClick={() => openEditModal(record)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePreviousPage}><FcPrevious /></button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage}><FcNext /></button>
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
