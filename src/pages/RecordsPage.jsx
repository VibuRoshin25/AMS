import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import RecordsTable from "../components/tables/RecordsTable";
import CreateEmployeeModal from "../components/modals/CreateEmployeeModal";
import PageOutline from "../components/PageOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDate,
  setSelectedName,
  selectSelectedDate,
  selectSelectedName,
} from "../store/recordsFilterSlice";

export default function RecordsPage() {
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
      <RecordsTable selectedDate={selectedDate} selectedName={selectedName} />
    </PageOutline>
  );
}
