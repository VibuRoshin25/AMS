const NavAnchor = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-black py-2 px-4 hover:bg-gray-700 w-full text-left text-2xl"
    >
      {children}
    </a>
  );
};

export default NavAnchor;
