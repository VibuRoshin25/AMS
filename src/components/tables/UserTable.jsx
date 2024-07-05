import { useSelector } from "react-redux";
import Table from "./Table";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import StyledTD from "../StyledTD";
import StyledTH from "../StyledTH";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useState } from "react";

dayjs.extend(isBetween);

export default function UserTable() {
  const { attendanceRecords, selectedDates } = useSelector(
    (state) => state.userFilters
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const startDate = dayjs(selectedDates.startDate, "DD-MM-YYYY").toDate();
  const endDate = dayjs(selectedDates.endDate, "DD-MM-YYYY").toDate();

  console.log(startDate, endDate);
  const filteredRecords = attendanceRecords.filter((record) => {
    const date = dayjs(record.id, "DD-MM-YYYY").isBetween(
      startDate,
      endDate,
      null,
      "[]"
    );
    return date;
  });

  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

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
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <StyledTD>{record.id}</StyledTD>
              <StyledTD>{record.status}</StyledTD>
              <StyledTD>{record.punchin}</StyledTD>
              <StyledTD>{record.punchout}</StyledTD>
              <StyledTD>{record.duration}</StyledTD>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-center items-center my-4">
        <button
          className="bg-sky-400 text-white px-4 py-2 rounded-l-lg disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <FcPrevious />
        </button>
        <span className="px-4 py-2 bg-white border border-gray-300 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-sky-400 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FcNext />
        </button>
      </div>
    </>
  );
}
