import { useState } from "react";
import Header from "../components/Header";
import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import Recordstable from "../components/Recordstable";
import CreateEmployeeModal from "../components/admin/CreateEmployeeModal";

export default function AdminPage() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });

  return (
    <div>
      <div className="relative">
        <div className="flex flex-col justify-center items-center backdrop-blur-xl relative ">
          <Header />
          <div className="flex justify-center gap-20 mt-8">
            <StyledDatePicker
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            <SearchBar />
            <CreateEmployeeModal />
          </div>
          <Recordstable selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}
