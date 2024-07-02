/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(2,0,36) 0%, rgba(125,211,252,1) 0%, rgba(2,132,199,1)  72%)",
        "login-bg": "URL('./src/assets/login-bg.png')",
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
    require("@tailwindcss/aspect-ratio"),
  ],
};
