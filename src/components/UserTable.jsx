import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UserTable() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const updateStatusForLateArrival = (checkin) => {
    return checkin > "09:00 AM" ? "Late arrival" : "On time";
  };

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = records.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="container mx-auto pt-6">
      <div className="overflow-hidden rounded-xl">
        <div className="shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-sky-300 rounded-t-lg">
              <tr>
                <th className="py-3 px-2 sm:px-6 text-white text-center">
                  Date
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
                const status = updateStatusForLateArrival(record.Checkin);
                let statusClasses = "text-black";
                if (status === "Late arrival") {
                  statusClasses = "text-yellow-500";
                }

                return (
                  <tr key={record.id}>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {record.Date}
                    </td>
                    <td
                      className={`py-2 px-2 sm:px-6 border-b border-gray-300 text-center ${statusClasses}`}
                    >
                      {record.Status === "Absent" ? "--" : record.Checkin}
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {record.Status === "Absent" ? "--" : record.CheckOut}
                    </td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-300 text-center">
                      {record.Status === "Absent"
                        ? "--"
                        : calculateTotalHours(record.Checkin, record.CheckOut)}
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
    </div>
  );
}
