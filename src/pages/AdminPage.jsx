import Header from "../components/Header";
import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import Recordstable from "../components/Recordstable";

export default function AdminPage() {
  
  return (
    <>
      <div className="backdrop-blur-xl">
        <Header />
        <div className="flex w-screen justify-center gap-20">
          <StyledDatePicker />
          <SearchBar  />
        </div>
        <Recordstable />
      </div>
    </>
  );
}
