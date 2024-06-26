const StyledTD = ({ children, className }) => {
  return (
    <td
      className={`py-4 px-2 border-b border-gray-300 text-center sm:px-4 ${className}`}
    >
      {children}
    </td>
  );
};

export default StyledTD;
