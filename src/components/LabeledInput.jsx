const LabeledInput = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  type,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const renderInput = () => {
    if (type === "select") {
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

    if (type === "checkbox") {
      return (
        <input
          type={type}
          checked={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-input self-start w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded "
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input w-full border-b shadow-sm"
      />
    );
  };

  return (
    <div className="mb-4 flex flex-col justify-start">
      <label className="block text-gray-700 text-sm font-bold">{label}</label>
      {renderInput()}
    </div>
  );
};

export default LabeledInput;
