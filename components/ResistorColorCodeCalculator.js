"use client";
import React, { useEffect, useState } from 'react';

const colorCodeMapping = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  gray: 8,
  white: 9,
  gold: -1, // For tolerance
  silver: -2, // For tolerance
};

const multiplierMapping = {
  black: 1,
  brown: 10,
  red: 100,
  orange: 1000,
  yellow: 10000,
  green: 100000,
  blue: 1000000,
  violet: 10000000,
  gray: 100000000,
  white: 1000000000,
};

const toleranceMapping = {
  brown: 1,
  red: 2,
  green: 0.5,
  blue: 0.25,
  violet: 0.1,
  gray: 0.05,
  gold: 5,
  silver: 10,
};

const ResistorColorCodeCalculator = () => {
  const [band1, setBand1] = useState('');
  const [band2, setBand2] = useState('');
  const [band3, setBand3] = useState('');
  const [tolerance, setTolerance] = useState('');

  // Initialize state on the client side
  useEffect(() => {
    setBand1('');
    setBand2('');
    setBand3('');
    setTolerance('');
  }, []);

  const calculateOhmValue = () => {
    if (band1 && band2 && band3 && tolerance) {
      const value =
        (colorCodeMapping[band1] * 10 + colorCodeMapping[band2]) *
        multiplierMapping[band3];
      return `${value} Ω ± ${toleranceMapping[tolerance]}%`;
    }
    return 'Please select all bands';
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Resistor Color Code Calculator</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-4">
          <label className="block mb-2">Band 1:</label>
          <select
            value={band1}
            onChange={(e) => setBand1(e.target.value)}
            className="px-3 py-2 border rounded-md w-full"
          >
            {Object.keys(colorCodeMapping).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Band 2:</label>
          <select
            value={band2}
            onChange={(e) => setBand2(e.target.value)}
            className="px-3 py-2 border rounded-md w-full"
          >
            {Object.keys(colorCodeMapping).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Multiplier:</label>
          <select
            value={band3}
            onChange={(e) => setBand3(e.target.value)}
            className="px-3 py-2 border rounded-md w-full"
          >
            {Object.keys(multiplierMapping).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tolerance:</label>
          <select
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            className="px-3 py-2 border rounded-md w-full"
          >
            {Object.keys(toleranceMapping).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="font-medium">Resistance: {calculateOhmValue()}</div>
    </div>
  );
};

export default ResistorColorCodeCalculator;
