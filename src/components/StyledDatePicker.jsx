import DatePicker from "react-tailwindcss-datepicker";

const StyledDatePicker = ({ selectedDate, onSelectDate, asSingle }) => {
  return (
    <div className="w-1/2">
      <DatePicker
        useRange={false}
        primaryColor={"sky"}
        showShortcuts={true}
        value={selectedDate}
        onChange={onSelectDate}
        configs={{
          shortcuts: {
            today: "Today",
            yesterday: "Yesterday",
          },
        }}
        displayFormat={"MM-DD-YYYY"} //DD-MM-YYYY shows the opposite
        asSingle={asSingle}
        toggleClassName="absolute h-8 mt-1 bg-white rounded-r-lg text-sky-500 right-1 pr-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        inputClassName="w-full h-11 rounded-lg p-4 focus:ring-0 font-normal text-center text-sm focus:outline-offset-0 shadow-md focus:outline-none focus:shadow-xl"
      />
    </div>
  );
};

export default StyledDatePicker;
