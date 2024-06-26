import Header from "../components/Header";
import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import UserPunchin from "../components/UserPunchin";
import Userprofile from "../components/Userprofile";
import UserTable from "../components/UserTable";

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col ">
      <Header />
      <div className="flex justify-center mb-10 mt-6">
        <div className="flex flex-row gap-10">
          <UserPunchin />
          <div className="p-6 rounded-lg h-90px flex flex-col">
            <Userprofile />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 w-full mb-10">
        <StyledDatePicker className="flex-1 min-w-[220px] max-w-[300px]" />
        <SearchBar className="flex-1 min-w-[220px] max-w-[300px]" />
      </div>
      <UserTable />
    </div>
  );
}
