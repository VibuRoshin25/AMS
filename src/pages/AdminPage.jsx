import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import Recordstable from "../components/table/Recordstable";
import CreateEmployeeModal from "../components/modals/CreateEmployeeModal";
import PageOutline from "../components/PageOutline";
import { useState } from "react";

export default function AdminPage() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });

  return (
    <PageOutline>
      <div className="flex justify-center gap-20 mt-8">
        <StyledDatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />{" "}
        <SearchBar />
        <CreateEmployeeModal />
      </div>
      <Recordstable selectedDate={selectedDate} />
    </PageOutline>
  );
}
