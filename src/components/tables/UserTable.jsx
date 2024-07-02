import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { db } from "../../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Table from "./Table";
import dayjs from "dayjs";
import StyledTD from "../StyledTD";
import StyledTH from "../StyledTH";

export default function UserTable({ userId, ...selectedDates }) {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchRecords = async () => {
      const attendanceDocRef = doc(db, "attendance", userId);

      setStartDate(selectedDates.selectedDate.startDate);
      setEndDate(selectedDates.selectedDate.endDate);

      const attendanceDocSnap = await getDoc(attendanceDocRef);

      if (attendanceDocSnap.exists()) {
        const data = attendanceDocSnap.data();
        const recordsList = Object.entries(data).map(([id, details]) => ({
          id,
          ...details,
        }));
        setRecords(recordsList);
      }

      console.log(records);
    };

    fetchRecords();
  }, []);

  const updateStatusForLateArrival = (punchin) => {
    return punchin > "09:00 AM" ? "Late arrival" : "On time";
  };

  const filteredRecords = records.filter((record) => {
    const formattedDate = dayjs(record.id, "dd-mm-yyyy").toDate();
    return formattedDate >= startDate && formattedDate <= endDate;
  });

  console.log(filteredRecords);

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
    <>
      <Table>
        <thead className="bg-sky-300 rounded-t-lg">
          <tr>
            <StyledTH className=" rounded-tl-lg">Date</StyledTH>
            <StyledTH>Status</StyledTH>
            <StyledTH>Punch In</StyledTH>
            <StyledTH>Punch Out</StyledTH>
            <StyledTH className=" rounded-tr-lg">Work Hours</StyledTH>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => {
            const status = updateStatusForLateArrival(record.punchin);
            let statusClasses = "text-black";
            if (status === "Late arrival") {
              statusClasses = "text-yellow-500";
            }

            return (
              <tr key={record.id}>
                <StyledTD>{record.id}</StyledTD>
                <StyledTD>{record.status}</StyledTD>
                <StyledTD className={` ${statusClasses}`}>
                  {record.status === "Absent" ? "--" : record.punchin}
                </StyledTD>
                <StyledTD>
                  {record.status === "Absent" ? "--" : record.punchout}
                </StyledTD>
                <StyledTD>
                  {record.status === "Absent" ? "--" : record.duration}
                </StyledTD>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
    </>
  );
}
