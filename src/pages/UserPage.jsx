import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchAttendanceRecords,
  setSelectedDates,
} from "../store/userFilterSlice";
import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import UserPunchin from "../components/profileComponents/UserPunchin";
import UserProfile from "../components/profileComponents/UserProfile";
import UserTable from "../components/tables/UserTable";
import PageOutline from "../components/PageOutline";

export default function UserPage({ userId }) {
  const dispatch = useDispatch();
  const selectedDates = useSelector((state) => state.userFilters.selectedDates);

  useEffect(() => {
    dispatch(fetchUserData(userId));
    dispatch(fetchAttendanceRecords({ userId, selectedDates }));
  }, [dispatch, userId, selectedDates]);

  return (
    <PageOutline>
      <div className="flex justify-center mb-10 mt-6 w-3/4">
        <div className="flex flex-row gap-10 w-full justify-between">
          <div className="justify-center">
            <UserPunchin userId={userId} />
          </div>
          <div className="p-6 rounded-lg h-90px flex flex-col">
            <UserProfile userId={userId} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 w-full mb-10">
        <StyledDatePicker
          asSingle={false}
          selectedDate={selectedDates}
          onSelectDate={(dates) => dispatch(setSelectedDates(dates))}
        />
        <SearchBar />
      </div>
      <UserTable selectedDate={selectedDates} userId={userId} />
    </PageOutline>
  );
}
