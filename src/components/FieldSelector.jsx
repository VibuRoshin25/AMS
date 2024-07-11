const FieldSelector = ({ value, children, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-1 sm:p-2 pr-0 border-none rounded bg-sky-500 sky-white text-center "
    >
      {children}
    </select>
  );
};

export default FieldSelector;
