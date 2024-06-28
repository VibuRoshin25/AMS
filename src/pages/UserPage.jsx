import StyledDatePicker from "../components/StyledDatePicker";
import SearchBar from "../components/SearchBar";
import UserPunchin from "../components/UserPunchin";
import Userprofile from "../components/Userprofile";
import UserTable from "../components/table/UserTable";
import PageOutline from "../components/PageOutline";

export default function UserPage({ userId }) {
  return (
    <PageOutline>
      <div className="flex justify-center mb-10 mt-6">
        <div className="flex flex-row gap-10">
          <UserPunchin userId={userId} />
          <div className="p-6 rounded-lg h-90px flex flex-col">
            <Userprofile userId={userId} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 w-full mb-10">
        <StyledDatePicker className="flex-1 min-w-[220px] max-w-[300px]" />
        <SearchBar className="flex-1 min-w-[220px] max-w-[300px]" />
      </div>
      <UserTable />
    </PageOutline>
  );
}
