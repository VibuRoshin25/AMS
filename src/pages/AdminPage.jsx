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
  const [selectedName, setSelectedName] = useState("");

  const handleSelectName = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <PageOutline>
      <div className="flex justify-center gap-20 mt-8">
        <StyledDatePicker
          asSingle={true}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <SearchBar
          selectedName={selectedName}
          onSelectName={handleSelectName}
        />
        <CreateEmployeeModal />
      </div>
      <Recordstable selectedDate={selectedDate} selectedName={selectedName} />
    </PageOutline>
  );
}
