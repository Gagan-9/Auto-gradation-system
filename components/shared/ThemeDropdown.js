// import React from "react";
// import Select from "react-select";
// import { customStyles } from "@/utils/customStyles";


// const ThemeDropdown = ({ handleThemeChange }) => {

//   const themes = [
//     {label: 'Dark', value: 'dark'},
//     {label: 'Light', value: 'light'},
//   ];

//   return (
//     <Select
//       options={themes}
//       styles={customStyles}
//       defaultValue={themes[0]}
//       onChange={handleThemeChange}
//     />
//   );
// };

// export default ThemeDropdown;




import React, { useState } from "react";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";

const ThemeDropdown = ({ handleThemeChange }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Initially set to dark theme

  const toggleTheme = () => {
    const newTheme = isDarkTheme
      ? { value: "light", label: "Light" }
      : { value: "dark", label: "Dark" };
    setIsDarkTheme(!isDarkTheme);
    handleThemeChange(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1 p-2 rounded-full transition-colors duration-300 focus:outline-none bg-gray-800 hover:bg-gray-700"
    >
      {isDarkTheme ? (
        <AiOutlineMoon size={20} className="text-yellow-300" />
      ) : (
        <AiOutlineSun size={20} className="text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeDropdown;
