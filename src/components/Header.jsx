import Button from "./buttons/Button";
import logo from "../assets/flipopay-logo.png";
import heading from "../assets/heading.png";
import { signOut, getAuth } from "firebase/auth";
// import ProfilePhoto from "./profileComponents/ProfilePhoto";

const Header = () => {
  const auth = getAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout clicked");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="w-[95%] bg-white flex items-center justify-between h-16 rounded-full shadow-md px-4 md:px-8 mb-4">
      <div className="flex items-center">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 py-2 md:py-4 px-2"
          />
        </a>
      </div>
      <img
        src={heading}
        alt="Heading"
        className="h-16 md:h-24 py-2 md:py-4 px-2"
      />
      {/* <h1 className="left-1/2 transform -translate-x-1/2 text-xl font-bold">
        Attendance Management System
      </h1> */}
      <div className="flex items-center">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
