import PageOutline from "../components/PageOutline";
import { selectCurrentUser } from "../store/authSlice";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const selectedUser = useSelector(selectCurrentUser);
  console.log(selectedUser);
  return (
    <PageOutline>
      <div className="w-full flex items-start p-4">
        <h1 className="text-3xl font-bold">Welcome, {selectedUser.name}!</h1>
      </div>
    </PageOutline>
  );
};

export default AdminPage;
