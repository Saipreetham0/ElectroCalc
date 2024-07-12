import React from "react";

const StarConnection = ({ resistances = { r1: "", r2: "", r3: "" } }) => {
  const { r1, r2, r3 } = resistances;

  return (
    <div className="star-connection text-text">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="5" fill="black" />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="100"
          x2="30"
          y2="150"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="100"
          x2="170"
          y2="150"
          stroke="black"
          strokeWidth="2"
        />
        <text x="110" y="30" fontSize="12" fill="black">
          Ra: {r1} Ω
        </text>
        <text x="20" y="130" fontSize="12" fill="black">
          Rb: {r2} Ω
        </text>
        <text x="160" y="130" fontSize="12" fill="black">
          Rc: {r3} Ω
        </text>
      </svg>
      <p className="text-center">Star Connection</p>
    </div>
  );
};

export default StarConnection;
