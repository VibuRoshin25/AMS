import Header from "../components/Header";
import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import Recordstable from "../components/Recordstable";
import CreateUser from "../components/admin/CreateUser";

export default function AdminPage() {
  return (
    <>
      <div className="backdrop-blur-xl">
        <Header />
        <div className="flex w-screen justify-center gap-20">
          <StyledDatePicker />
          <SearchBar />
        </div>
        <Recordstable />
        <CreateUser />
      </div>
    </>
  );
}
