import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import UserPunchin from "../components/UserPunchin";
import Userprofile from "../components/Userprofile";
import UserTable from "../components/table/UserTable";
import PageOutline from "../components/PageOutline";
import { useState } from "react";

export default function UserPage({ userId }) {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const [selectedDates, setSelectedDates] = useState({
    startDate: oneMonthAgo,
    endDate: today,
  });
  console.log(selectedDates);

  return (
    <PageOutline>
      <div className="flex justify-center mb-10 mt-6 w-3/4">
        <div className="flex flex-row gap-10 w-full justify-between">
          <div className="justify-center">
            <UserPunchin userId={userId} />
          </div>
          <div className="p-6 rounded-lg h-90px flex flex-col">
            <Userprofile userId={userId} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 w-full mb-10">
        <StyledDatePicker
          asSingle={false}
          selectedDate={selectedDates}
          onSelectDate={setSelectedDates}
        />
        <SearchBar />
      </div>
      <UserTable selectedDate={selectedDates} userId={userId} />
    </PageOutline>
  );
}
