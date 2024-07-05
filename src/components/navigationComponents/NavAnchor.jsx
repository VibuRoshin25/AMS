const NavAnchor = ({ href, children }) => {
  return (
    <a
      href={href}
      className="py-2 px-6 hover:bg-sky-500 hover:text-white w-full text-sky-800 text-left text-xl flex justify-start items-center gap-8 "
    >
      {children}
    </a>
  );
};

export default NavAnchor;
