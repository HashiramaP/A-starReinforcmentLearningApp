import React, { useState } from "react";

function Episodes({
  setIterations,
}: {
  setIterations: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [iterations, setIterationsLocal] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setIterationsLocal(value); // Update local state
    setIterations(value); // Pass value to parent (HomepageButtons)
  };

  return (
    <div className="flex align-middle text-xl items-center font-halo">
      Select the number of iterations
      <select
        className="m-2 bg-custom-bg h-10 w-20 text-center border-[3px] border-solid border-[rgb(45,45,45)] rounded-[25px_35px_20px_30px] shadow-[rgba(0, 0, 0, 0.3)_-5px_5px_8px] text-black font-halo text-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-[rgba(0, 0, 0, 0.6)_-3px_3px_5px] active:scale-95 active:shadow-[rgba(0, 0, 0, 0.8)_-2px_2px_3px] focus:outline-none appearance-none pl-2.5 pr-8"
        name="iterations"
        id="iterations"
        value={iterations}
        onChange={handleChange}
      >
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <style jsx>{`
        select::-ms-expand {
          display: none; /* Remove default arrow for IE */
        }

        select {
          background-image: url("https://img.icons8.com/sf-black-filled/64/expand-arrow.png"); /* Custom image URL */
          background-repeat: no-repeat;
          background-position: right 10px center; /* Adjust positioning */
          background-size: 20px 12px; /* Adjust size of the arrow (fattened arrow) */
        }
      `}</style>
    </div>
  );
}

export default Episodes;
