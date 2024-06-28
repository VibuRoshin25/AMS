const NavAnchor = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-sky-900 py-2 px-4 hover:bg-sky-500 hover:text-white w-full text-left text-2xl font-serif"
    >
      {children}
    </a>
  );
};

export default NavAnchor;
