import React, { useState } from "react";

export default function ToggleSwitch({ initialState, tooltip = "Payment" }) {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };


  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-gray-800 p-4 rounded-lg w-[120px] shadow-md relative group">
      {/* Label */}
      <h1 className="text-white capitalize text-sm">
        {isToggled ? "Allowed" : "Disable"}
      </h1>

      {/* Toggle Switch */}
      <label
        htmlFor="toggle-switch"
        className="flex cursor-pointer items-center"
      >
        <div className="relative">
          <input
            id="toggle-switch"
            type="checkbox"
            checked={isToggled}
            onChange={handleToggle}
            className="sr-only"
          />
          {/* Switch Background */}
          <div
            className={`block h-6 w-12 rounded-full transition-all ${
              isToggled ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          {/* Switch Knob */}
          <div
            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-black transition-transform ${
              isToggled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>

      {/* Tooltip */}
      <div className="absolute -top-8  left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {tooltip}
      </div>
    </div>
  );
}
