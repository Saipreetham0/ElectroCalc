// export default ResistorColorCode;

"use client";
import React, { useState } from "react";

const colors = [
  { name: "black", hex: "#000000", value: 0, multiplier: 1, tempCoeff: 250 },
  {
    name: "brown",
    hex: "#8B4513",
    value: 1,
    multiplier: 10,
    tolerance: 1,
    tempCoeff: 100,
  },
  {
    name: "red",
    hex: "#FF0000",
    value: 2,
    multiplier: 100,
    tolerance: 2,
    tempCoeff: 50,
  },
  { name: "orange", hex: "#FFA500", value: 3, multiplier: 1000, tempCoeff: 15 },
  {
    name: "yellow",
    hex: "#FFFF00",
    value: 4,
    multiplier: 10000,
    tempCoeff: 25,
  },
  {
    name: "green",
    hex: "#008000",
    value: 5,
    multiplier: 100000,
    tolerance: 0.5,
  },
  {
    name: "blue",
    hex: "#0000FF",
    value: 6,
    multiplier: 1000000,
    tolerance: 0.25,
  },
  {
    name: "violet",
    hex: "#EE82EE",
    value: 7,
    multiplier: 10000000,
    tolerance: 0.1,
  },
  { name: "gray", hex: "#808080", value: 8, tolerance: 0.05 },
  { name: "white", hex: "#FFFFFF", value: 9 },
  { name: "gold", hex: "#FFD700", multiplier: 0.1, tolerance: 5 },
  { name: "silver", hex: "#C0C0C0", multiplier: 0.01, tolerance: 10 },
];

const ResistorColorCode = () => {
  const [bandsCount, setBandsCount] = useState(4);
  const [band1, setBand1] = useState("red");
  const [band2, setBand2] = useState("black");
  const [band3, setBand3] = useState("brown");
  const [multiplier, setMultiplier] = useState("red");
  const [tolerance, setTolerance] = useState("gold");
  const [temperatureCoefficient, setTemperatureCoefficient] = useState("black");

  const calculateResistance = () => {
    const digit1 = colors.find((c) => c.name === band1)?.value;
    const digit2 = colors.find((c) => c.name === band2)?.value;
    const digit3 =
      bandsCount > 4 ? colors.find((c) => c.name === band3)?.value : 0;
    const multiplierValue =
      colors.find((c) => c.name === multiplier)?.multiplier || 1;
    const toleranceValue =
      colors.find((c) => c.name === tolerance)?.tolerance || 5;
    const temperatureCoefficientValue =
      bandsCount === 6
        ? colors.find((c) => c.name === temperatureCoefficient)?.tempCoeff
        : null;

    if (
      digit1 === undefined ||
      digit2 === undefined ||
      (bandsCount > 4 && digit3 === undefined)
    ) {
      return "Invalid selection. Please select valid colors for all bands.";
    }

    let resistance = 0;

    if (bandsCount === 3) {
      resistance = (digit1 * 10 + digit2) * multiplierValue;
    } else if (bandsCount === 4) {
      resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplierValue;
    } else if (bandsCount === 5 || bandsCount === 6) {
      resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplierValue;
    }

    let unit = "Ω";
    let formattedResistance = resistance;

    if (resistance >= 1e6) {
      formattedResistance = resistance / 1e6;
      unit = "MΩ";
    } else if (resistance >= 1e3) {
      formattedResistance = resistance / 1e3;
      unit = "kΩ";
    }

    return `${formattedResistance} ${unit} ±${toleranceValue}%${
      temperatureCoefficientValue !== null
        ? ` ${temperatureCoefficientValue} ppm/K`
        : ""
    }`;
  };

  const renderBands = () => {
    return (
      <>
        <div className="flex flex-col items-center">
          <label className="mb-2">Band 1</label>
          <select
            value={band1}
            onChange={(e) => setBand1(e.target.value)}
            className="p-3 border rounded"
            // className="px-3 py-2 border rounded-md w-full"
          >
            {colors
              .filter((c) => c.value !== undefined)
              .map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <label className="mb-2">Band 2</label>
          <select
            value={band2}
            onChange={(e) => setBand2(e.target.value)}
            className="p-3 border rounded"
          >
            {colors
              .filter((c) => c.value !== undefined)
              .map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        {(bandsCount === 4 || bandsCount === 5 || bandsCount === 6) && (
          <div className="flex flex-col items-center">
            <label className="mb-2">Band 3</label>
            <select
              value={band3}
              onChange={(e) => setBand3(e.target.value)}
              className="p-3 border rounded"
            >
              {colors
                .filter((c) => c.value !== undefined)
                .map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="flex flex-col items-center">
          <label className="mb-2">Multiplier</label>
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="p-3 border rounded "
          >
            {colors
              .filter((c) => c.multiplier !== undefined)
              .map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <label className="mb-2">Tolerance</label>
          <select
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            className="p-3 border rounded"
          >
            {colors
              .filter((c) => c.tolerance !== undefined)
              .map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        {bandsCount === 6 && (
          <div className="flex flex-col items-center">
            <label className="mb-2">Temperature Coefficient</label>
            <select
              value={temperatureCoefficient}
              onChange={(e) => setTemperatureCoefficient(e.target.value)}
              className="p-3 border rounded"
            >
              {colors
                .filter((c) => c.tempCoeff !== undefined)
                .map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="mb-4">
        <label className="mr-4">Number of Bands:</label>
        <select
          value={bandsCount}
          onChange={(e) => setBandsCount(Number(e.target.value))}
          className="p-3 border rounded"
        >
          <option value={3}>3 Bands</option>
          <option value={4}>4 Bands</option>
          <option value={5}>5 Bands</option>
          <option value={6}>6 Bands</option>
        </select>
      </div>
      <div className="flex items-center justify-around w-64 h-20 bg-gray-200 rounded-lg p-2 border border-gray-400 mb-4">
        <div className="flex-1 h-16 bg-white"></div>
        <div
          className="w-4 h-16 mx-2"
          style={{ backgroundColor: colors.find((c) => c.name === band1)?.hex }}
        ></div>
        <div
          className="w-4 h-16 mx-2"
          style={{ backgroundColor: colors.find((c) => c.name === band2)?.hex }}
        ></div>
        {(bandsCount === 4 || bandsCount === 5 || bandsCount === 6) && (
          <div
            className="w-4 h-16 mx-2"
            style={{
              backgroundColor: colors.find((c) => c.name === band3)?.hex,
            }}
          ></div>
        )}
        <div
          className="w-4 h-16 mx-2"
          style={{
            backgroundColor: colors.find((c) => c.name === multiplier)?.hex,
          }}
        ></div>
        <div
          className="w-4 h-16 mx-2"
          style={{
            backgroundColor: colors.find((c) => c.name === tolerance)?.hex,
          }}
        ></div>
        {bandsCount === 6 && (
          <div
            className="w-4 h-16 mx-2"
            style={{
              backgroundColor: colors.find(
                (c) => c.name === temperatureCoefficient
              )?.hex,
            }}
          ></div>
        )}
        <div className="flex-1 h-16 bg-white"></div>
      </div>
      <div className="mt-4 text-2xl text-gray-800">{calculateResistance()}</div>
      <div className="mt-4 flex flex-row space-x-4">{renderBands()}</div>
    </div>
  );
};

export default ResistorColorCode;
