import React, { useState } from "react";

export function Switch({ checked = false, onChange, className = "" }) {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) onChange(newState);
  };

  return (
    <div
      onClick={toggle}
      className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-blue-500" : ""
      } ${className}`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
}
