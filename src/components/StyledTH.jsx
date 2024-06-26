const StyledTH = ({ children, className }) => {
  return (
    <th className={`py-4 px-2 sm:px-4 text-white text-center ${className}`}>
      {children}
    </th>
  );
};

export default StyledTH;
