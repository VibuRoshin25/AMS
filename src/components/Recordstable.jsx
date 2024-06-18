import React, { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

export default function Recordstable() {
  const roles = ["All Roles", "Junior software developer", "Senior software developer", "Manager", "MIS", "Intern", "Trainee"];
  const departments = ["All Departments", "IT", "HR", "Accounts", "MIS"];
  const statuses = ["All Statuses", "Work from home", "Work from office", "Absent", "Late arrival"];

  const initialRecords = [
    {
      id: 1,
      Employee: "Suhail",
      role: "Junior software developer",
      Department: "IT",
      Date: "29/03/1996",
      Status: "Work from home",
      Checkin: "09:00 AM",
      CheckOut: "06:30 PM",
    },
   {
      id: 2,
      Employee: "Sabari",
      role: "Senior software developer",
      Department: "IT",
      Date: "29/03/1996",
      Status: "Work from home",
      Checkin: "09:00 AM",
      CheckOut: "05:48 PM",
    },
    {
      id: 3,
      Employee: "Vino",
      role: "Manager",
      Department: "IT",
      Date: "29/03/1996",
      Status: "Work from home",
      Checkin: "09:00 AM",
      CheckOut: "09:48 PM",
    },
    {
      id: 4,
      Employee: "prakash",
      role: "MIS",
      Department: "IT",
      Date: "29/03/1996",
      Status: "Work from home",
      Checkin: "09:00 AM",
      CheckOut: "06:48 PM",
    },
    {
      id: 5,
      Employee: "singing jose",
      role: "MIS",
      Department: "IT",
      Date: "29/03/1996",
      Status: "Late arrival",
      Checkin: "11:00 AM",
      CheckOut: "04:48 PM",
    },
    {
      id: 6,
      Employee: "Aishwarya",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
    {
      id: 7,
      Employee: "Kavery",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
    {
      id: 8,
      Employee: "Ganga",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
    {
      id: 9,
      Employee: "Yamuna",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
    {
      id: 10,
      Employee: "Kavitha",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
    {
      id: 11,
      Employee: "MAlinini",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
    {
      id: 12,
      Employee: "Priya",
      role: "Intern",
      Department: "HR",
      Date: "29/03/1996",
      Status: "Absent",
      Checkin: "09:00 AM",
      CheckOut: "07:48 PM",
    },
  ];

  const [records, setRecords] = useState(initialRecords);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    setSelectedRole("All");
    setSelectedDepartment("All");
    setSelectedStatus("All");
  }, [records]);

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
      (selectedDepartment === "All" || record.Department === selectedDepartment) &&
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

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-sky-500 rounded-t-lg">
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
              <th className="py-3 px-6 text-white text-center rounded-tr-lg">Work Hours</th>
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
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{record.Employee}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">{record.role}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{record.Department}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{record.Date}</td>
                  <td className={`py-2 px-6 border-b border-gray-300 text-center`}>
                    <button className={statusClasses}>
                      {status}
                    </button>
                  </td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{status === "Absent" ? "--" : record.Checkin}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{status === "Absent" ? "--" : record.CheckOut}</td>
                  <td className="py-2 px-6 border-b border-gray-300 text-center">{status === "Absent" ? "--" : calculateTotalHours(record.Checkin, record.CheckOut)}</td>
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
    </div>
  );
}
