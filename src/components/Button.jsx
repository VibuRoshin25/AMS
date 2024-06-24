const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
