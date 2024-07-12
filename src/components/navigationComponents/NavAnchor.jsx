const NavAnchor = ({ href, children }) => {
  return (
    <a
      href={href}
      className="py-2 px-6 font-bold text-white w-full text-left text-xl flex justify-start hover:rounded-full hover:bg-black hover:bg-opacity-10 items-center gap-8 "
    >
      {children}
    </a>
  );
};

export default NavAnchor;
