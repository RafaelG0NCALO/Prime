import { CaretDown, MagnifyingGlass } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";

const SelectField = ({ icon, options, value, error, onChange, selecioneText, label, clear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [searchText, setSearchText] = useState("");
  const selectRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Se a propriedade 'clear' for true, redefina o estado do SelectField para o valor inicial
    if (clear) {
      setSelectedOption("");
      setSearchText("");
    }
  }, [clear]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div ref={selectRef} className="relative flex-1 my-1">
      <label className="text-gray-400">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={` cursor-pointer border-[1px] flex justify-between items-center rounded-md pl-10 peer h-14 w-full text-gray-500 placeholder-transparent focus:outline-none focus:border-sky-600${
          error && isOpen
            ? " border-[1px] border-red-500"
            : " border-gray-200 border-[1px]"
        }`}
      >
        <div className="w-10 h-14 absolute flex items-center justify-center left-0 p-2 text-sky-500 peer-focus:text-sky-600">
          {icon}
        </div>
        {selectedOption ? selectedOption : selecioneText}
        <div className="w-5 h-5 text-purple-800 pr-7">
          <CaretDown
            className={`transition ease-in-out ${
              isOpen ? "transform rotate-180 " : ""
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-2 py-2 w-full bg-white shadow-md shadow-[#100f2737] text-gray-500 rounded-md">
          <div className="relative flex items-center border-b-[1px] border-gray-300">
            <MagnifyingGlass className="w-7 h-7 p-1" />
            <input
              type="text"
              className="p-2 w-full bg-transparent text-purple-800 focus:outline-none"
              placeholder="Buscar..."
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </div>
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <li className="py-2 px-4 text-gray-600">Nenhum resultado encontrado</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="py-2 px-4 cursor-pointer dark:hover:bg-[#222742] hover:bg-gray-200"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectField;
