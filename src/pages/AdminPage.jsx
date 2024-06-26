import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import Recordstable from "../components/Recordstable";
import CreateEmployeeModal from "../components/modals/CreateEmployeeModal";
import PageOutline from "../components/PageOutline";

export default function AdminPage() {
  return (
    <PageOutline>
      <div className="flex justify-center gap-20 mt-8">
        <StyledDatePicker />
        <SearchBar />
        <CreateEmployeeModal />
      </div>
      <Recordstable />
    </PageOutline>
  );
}
