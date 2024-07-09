const Footer = () => {
  return (
    <footer className="bg-sky-200 w-full flex justify-center shadow mt-4 py-4">
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        <span className="text-sm text-gray-500 text-center md:text-left">
          © 2023{" "}
          <a href="https://flipopay.com/" className="hover:underline">
            Flipopay™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 md:mt-0 text-sm font-medium text-sky-800">
          <li className="mr-4 md:mr-6">
            <a href="https://flipopay.com/about/" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a
              href="https://flipopay.com/contact-us/"
              className="hover:underline"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
