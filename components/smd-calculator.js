// pages/smd-calculator.js
'use client';
import { useState } from "react";

const SMDResistorCalculator = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const calculateResistance = (code) => {
    if (code.length === 3) {
      const significantFigures = code.slice(0, 2);
      const multiplier = code[2];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    } else if (code.length === 4) {
      const significantFigures = code.slice(0, 3);
      const multiplier = code[3];
      return parseInt(significantFigures) * Math.pow(10, parseInt(multiplier));
    } else {
      return null;
    }
  };

  const handleCalculate = () => {
    const resistance = calculateResistance(code);
    if (resistance !== null) {
      setResult(`Resistance: ${resistance} Ω`);
    } else {
      setResult("Invalid code");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">SMD Resistor Code Calculator</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Enter SMD Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
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

export default SMDResistorCalculator;
