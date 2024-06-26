import React from "react";

const LabeledInput = ({ label, value, onChange, options, placeholder }) => {
  const getInputType = (label) => {
    switch (label.toLowerCase()) {
      case "email":
        return "email";
      case "password":
      case "confirm password":
        return "password";
      case "department":
      case "role":
        return "select";
      default:
        return "text";
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const renderInput = () => {
    const inputType = getInputType(label);

    if (inputType === "select") {
      return (
        <select
          value={value}
          onChange={handleChange}
          className="form-select mt-1 block w-full border-b shadow-sm"
        >
          <option value="">Select {label}</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      );
    }

    return (
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input mt-1 block w-full border-b shadow-sm"
      />
    );
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default LabeledInput;
