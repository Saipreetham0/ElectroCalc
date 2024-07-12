"use client";
import { useState } from "react";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [result, setResult] = useState("");
  const [formula, setFormula] = useState("");

  const calculateOhmsLaw = () => {
    if (voltage && current) {
      const calculatedResistance = (
        parseFloat(voltage) / parseFloat(current)
      ).toFixed(2);
      setResistance(calculatedResistance);
      setResult(`R = ${calculatedResistance} Ω`);
      setFormula("R = V / I");
    } else if (voltage && resistance) {
      const calculatedCurrent = (
        parseFloat(voltage) / parseFloat(resistance)
      ).toFixed(2);
      setCurrent(calculatedCurrent);
      setResult(`I = ${calculatedCurrent} A`);
      setFormula("I = V / R");
    } else if (current && resistance) {
      const calculatedVoltage = (
        parseFloat(current) * parseFloat(resistance)
      ).toFixed(2);
      setVoltage(calculatedVoltage);
      setResult(`V = ${calculatedVoltage} V`);
      setFormula("V = I * R");
    } else {
      setResult("Please provide at least two values");
      setFormula("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Ohm's Law Calculator</h1>
        <p className="text-center mb-4">
          Ohm's Law states that the current flowing through a conductor between two points is directly proportional to the voltage across the two points. The formula is:
        </p>
        <p className="text-center italic font-semibold mb-6">V = I * R</p>
        <div className="mb-4">
          <label className="block text-gray-700">Voltage (V)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current (I)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Resistance (R)</label>
          <input
            type="number"
            value={resistance}
            onChange={(e) => setResistance(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={calculateOhmsLaw}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>
        <p className="text-center mt-4 text-lg font-semibold">{result}</p>
        {formula && (
          <p className="text-center mt-2 text-gray-700">Formula: {formula}</p>
        )}
        <p className="text-center mt-2 text-gray-500">Enter any two values to calculate the third.</p>
      </div>
    </div>
  );
};

export default OhmsLawCalculator;
