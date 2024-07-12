import React from "react";

const DeltaConnection = ({ resistances = { r1: "", r2: "", r3: "" } }) => {
  const { r1, r2, r3 } = resistances;

  return (
    <div className="delta-connection text-text">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <polygon
          points="100,20 30,150 170,150"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <text x="80" y="15" fontSize="12" fill="black">
          Rab: {r1} Ω
        </text>
        <text x="0" y="125" fontSize="12" fill="black">
          Rbc: {r2} Ω
        </text>
        <text x="160" y="120" fontSize="12" fill="black">
          Rac: {r3} Ω
        </text>
      </svg>
      <p className="text-center">Delta Connection</p>
    </div>
  );
};

export default DeltaConnection;
