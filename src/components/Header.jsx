import React from "react";
import Button from "./Button";
import logo from "../assets/flipopay_logo.png";

const Header = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  return (
    <header className="relative bg-sky-100 m-4 flex justify-between items-center h-16 shadow-md rounded-2xl">
      <div className="flex items-center">
        <img
          src={logo} // Replace with your logo URL
          alt="Logo"
          className="h-16 py-4 px-2 ml-2"
        />
      </div>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
        Attendance Management System
      </h1>
      <Button onClick={handleLogout} className="mr-2">
        Logout
      </Button>
    </header>
  );
};

export default Header;
