import React from "react";
import { useState } from "react";
import DatePicker from "react-tailwindcss-datepicker";

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const StyledDatePicker = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <div className="max-w-md mx-auto">
      <DatePicker
        useRange={false}
        primaryColor={"sky"}
        showShortcuts={true}
        value={value}
        onChange={handleValueChange}
        configs={{
          shortcuts: {
            today: "Today",
            yesterday: "Yesterday",
          },
        }}
        displayFormat={"DD/MM/YYYY"}
        asSingle={true}
        placeholder={`${day}/${month}/${year}`}
        toggleClassName="absolute bg-white rounded-r-lg text-sky-500 right-1 px-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed top-5"
        inputClassName="w-full rounded-lg p-4 focus:ring-0 font-normal text-center text-sm border-2 border-sky-500 focus:outline-offset-0 focus:outline-sky-500 focus:shadow-xl"
      />
    </div>
  );
};

export default StyledDatePicker;
