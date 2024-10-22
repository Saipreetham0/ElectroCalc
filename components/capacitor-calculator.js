"use client";

// app/capacitor-calculator/page.tsx

import { useState } from "react";

const CapacitorCodeCalculator = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const calculateCapacitance = (code) => {
    if (/^\d{3}$/.test(code)) {
      const significantFigures = code.slice(0, 2);
      const multiplier = code[2];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    } else if (/^\d{4}$/.test(code)) {
      const significantFigures = code.slice(0, 3);
      const multiplier = code[3];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    } else {
      return null;
    }
  };

  const handleCalculate = () => {
    const capacitance = calculateCapacitance(code);
    if (capacitance !== null) {
      setResult(`Capacitance: ${capacitance} pF`);
    } else {
      setResult("Invalid code. Please enter a valid 3 or 4 digit capacitor code.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Capacitor Code Calculator</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Enter Capacitor Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter 3 or 4 digit code"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>
        <p className="text-center mt-4 text-lg font-semibold">{result}</p>
      </div>
    </div>
  );
};

export default CapacitorCodeCalculator;
