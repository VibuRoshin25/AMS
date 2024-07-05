import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import RecordStable from "../components/tables/RecordStable";
import CreateEmployeeModal from "../components/modals/CreateEmployeeModal";
import PageOutline from "../components/PageOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDate,
  setSelectedName,
  selectSelectedDate,
  selectSelectedName,
} from "../store/adminFilterSlice";

export default function AdminPage() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  console.log(selectedDate);
  const selectedName = useSelector(selectSelectedName);

  const handleSelectName = (event) => {
    dispatch(setSelectedName(event.target.value));
  };

  return (
    <PageOutline>
      <div className="flex w-full items-start">
        <div className="flex justify-between px-12 w-full mt-8">
          <div className="flex justify-between gap-10">
            <StyledDatePicker
              asSingle={true}
              selectedDate={selectedDate}
              onSelectDate={(date) => dispatch(setSelectedDate(date))}
            />
            <SearchBar
              selectedName={selectedName}
              onSelectName={handleSelectName}
            />
          </div>
          <CreateEmployeeModal />
        </div>
      </div>
      <RecordStable selectedDate={selectedDate} selectedName={selectedName} />
    </PageOutline>
  );
}
