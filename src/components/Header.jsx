import Button from "./Button";
import logo from "../assets/flipopay-logo.png";
import { signOut, getAuth } from "firebase/auth";

const Header = () => {
  const auth = getAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout clicked");
    } catch (error) {
      console.log();
    }
  };

  return (
    <header className="w-full drop-shadow-xl bg-sky-200 flex  mb-4  justify-between items-center h-16 shadow-md">
      <div className="flex items-center">
        <a href="/">
          <img src={logo} alt="Logo" className="h-16 py-4 px-2 ml-2" />
        </a>
      </div>
      <h1 className="left-1/2 transform -translate-x-1/2 text-xl font-bold">
        Attendance Management System
      </h1>
      <Button onClick={handleLogout} className="">
        Logout
      </Button>
    </header>
  );
};

export default Header;
