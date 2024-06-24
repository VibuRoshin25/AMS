import Header from "../components/Header";
import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import Recordstable from "../components/Recordstable";
import CreateEmployeeModal from "../components/admin/CreateEmployeeModal";
import wallpaper from "../assets/HomePage.jpg";

export default function AdminPage() {
  return (
    

   <div>
    <div className="relative">
      
      <div className="flex flex-col justify-center items-center backdrop-blur-xl relative ">
        <Header />
        <div className="flex justify-center gap-20 mt-8">
          <StyledDatePicker />
          <SearchBar />
          <CreateEmployeeModal />
        </div>
        <Recordstable />
      </div>
    </div>
    </div>

  );
}
