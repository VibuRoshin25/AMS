import Button from "./Button";
import logo from "../assets/flipopay-logo.png";
import heading from "../assets/heading.png";
import { signOut, getAuth } from "firebase/auth";
import ProfilePhoto from "./profileComponents/ProfilePhoto";

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
    <header className="w-full drop-shadow-xl bg-sky-200 flex  mb-4 justify-between items-center h-16 shadow-md ">
      <div className="flex items-center">
        <a href="/">
          <img src={logo} alt="Logo" className="h-16 py-4 px-2 ml-2" />
        </a>
      </div>
      <img
        src={heading}
        alt="heading"
        className="h-24 fixed left-1/3 py-4 px-2 ml-2"
      />
      {/* <h1 className="left-1/2 transform -translate-x-1/2 text-xl font-bold">
        Attendance Management System
      </h1> */}
      <div className="flex items-center justify-end">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
