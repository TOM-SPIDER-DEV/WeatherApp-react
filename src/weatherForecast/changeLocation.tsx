import React from "react";
import { LocationSVG } from "../svg/svgs";

function ChangeLocation(props: {
  onInputChange: (value: string) => void;
  error: false | true;
}) {
  const [inputValue, setInputValue] = React.useState("");
  const [showInput, setShowInput] = React.useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleMouseEnter = () => {
    setShowInput(false);
  };

  const handleClick = () => {
    props.onInputChange(inputValue);
  };

  return (
    <section>
      <div className="flex justify-center items-center relative">
        <input
          type="text"
          className={`rounded-xl w-11/12 h-10 pr-1 focus:outline-none focus:border-none text-white text-center placeholder-white text-lg bg-gradient ${
            props.error && "text-red"
          }`}
          placeholder="Change Location"
          onMouseEnter={handleMouseEnter}
          onChange={handleChange}
        />
        <LocationSVG
          classname={`absolute top-0 mr-40 mt-2 h-6 w-6 ${
            !showInput && inputValue && "hidden"
          }`}
        />
      </div>

      <div className="flex justify-center items-center flex-col">
        {props.error && (
          <p className="text-center text-red-900 text-xl p-2 text-red ">
            Location not found. Please enter a valid location.
          </p>
        )}
        <button
          className="rounded-xl w-11/12 h-10  text-white text-center placeholder-white text-lg m-4  bg-gradient "
          onClick={handleClick}
        >
          <span
            className="bg-brand inline-block  rounded-xl h-8 hover:bg-transparent transition"
            style={{ width: "99%" }}
          >
            View summary of the city
          </span>
        </button>
      </div>
    </section>
  );
}

export { ChangeLocation };
