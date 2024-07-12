"use client";
// import React, { useState } from "react";
// import StarConnection from "../components/StarConnection";
// import DeltaConnection from "../components/DeltaConnection";

// const ConversionForm = () => {
//   const [starResistances, setStarResistances] = useState({
//     r1: "",
//     r2: "",
//     r3: "",
//   });
//   const [deltaResistances, setDeltaResistances] = useState({
//     r1: "",
//     r2: "",
//     r3: "",
//   });

//   const handleStarChange = (e) => {
//     const { name, value } = e.target;
//     setStarResistances({ ...starResistances, [name]: value });
//   };

//   const handleDeltaChange = (e) => {
//     const { name, value } = e.target;
//     setDeltaResistances({ ...deltaResistances, [name]: value });
//   };

//   const calculateStarToDelta = () => {
//     const { r1, r2, r3 } = starResistances;
//     const R1 = parseFloat(r1);
//     const R2 = parseFloat(r2);
//     const R3 = parseFloat(r3);

//     if (!isNaN(R1) && !isNaN(R2) && !isNaN(R3)) {
//       const deltaR1 = (R1 * R2 + R2 * R3 + R3 * R1) / R1;
//       const deltaR2 = (R1 * R2 + R2 * R3 + R3 * R1) / R2;
//       const deltaR3 = (R1 * R2 + R2 * R3 + R3 * R1) / R3;
//       setDeltaResistances({
//         r1: deltaR1.toFixed(2),
//         r2: deltaR2.toFixed(2),
//         r3: deltaR3.toFixed(2),
//       });
//     }
//   };

//   const calculateDeltaToStar = () => {
//     const { r1, r2, r3 } = deltaResistances;
//     const R1 = parseFloat(r1);
//     const R2 = parseFloat(r2);
//     const R3 = parseFloat(r3);

//     if (!isNaN(R1) && !isNaN(R2) && !isNaN(R3)) {
//       const starR1 = (R1 * R2) / (R1 + R2 + R3);
//       const starR2 = (R2 * R3) / (R1 + R2 + R3);
//       const starR3 = (R3 * R1) / (R1 + R2 + R3);
//       setStarResistances({
//         r1: starR1.toFixed(2),
//         r2: starR2.toFixed(2),
//         r3: starR3.toFixed(2),
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
//         <h2 className="text-2xl font-bold mb-4 text-center">Star to Delta Conversion</h2>
//         <div className="mb-4">
//           <label className="block mb-2">Star Resistances:</label>
//           <input
//             type="number"
//             name="r1"
//             value={starResistances.r1}
//             onChange={handleStarChange}
//             placeholder="R1"
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="r2"
//             value={starResistances.r2}
//             onChange={handleStarChange}
//             placeholder="R2"
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="r3"
//             value={starResistances.r3}
//             onChange={handleStarChange}
//             placeholder="R3"
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <button
//             onClick={calculateStarToDelta}
//             className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//           >
//             Convert to Delta
//           </button>
//         </div>
//         <div className="flex justify-center mb-8">
//           <DeltaConnection resistances={deltaResistances} />
//         </div>

//         <h2 className="text-2xl font-bold mb-4 text-center">Delta to Star Conversion</h2>
//         <div className="mb-4">
//           <label className="block mb-2">Delta Resistances:</label>
//           <input
//             type="number"
//             name="r1"
//             value={deltaResistances.r1}
//             onChange={handleDeltaChange}
//             placeholder="R1"
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="r2"
//             value={deltaResistances.r2}
//             onChange={handleDeltaChange}
//             placeholder="R2"
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <input
//             type="number"
//             name="r3"
//             value={deltaResistances.r3}
//             onChange={handleDeltaChange}
//             placeholder="R3"
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <button
//             onClick={calculateDeltaToStar}
//             className="bg-green-500 text-white px-4 py-2 rounded w-full"
//           >
//             Convert to Star
//           </button>
//         </div>
//         <div className="flex justify-center">
//           <StarConnection resistances={starResistances} />
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import StarConnection from "../components/StarConnection";
import DeltaConnection from "../components/DeltaConnection";

const ConversionForm = () => {
  const [starResistances, setStarResistances] = useState({
    r1: "",
    r2: "",
    r3: "",
    unit1: "Ω",
    unit2: "Ω",
    unit3: "Ω",
  });
  const [deltaResistances, setDeltaResistances] = useState({
    r1: "",
    r2: "",
    r3: "",
    unit1: "Ω",
    unit2: "Ω",
    unit3: "Ω",
  });

  const parseResistance = (value, unit) => {
    const number = parseFloat(value);
    if (isNaN(number)) return NaN;

    switch (unit) {
      case "Ω":
        return number;
      case "k":
        return number * 1000;
      case "M":
        return number * 1000000;
      case "m":
        return number * 0.001;
      default:
        return number;
    }
  };

  const handleStarChange = (e, index) => {
    const { name, value } = e.target;
    const newStarResistances = { ...starResistances };
    newStarResistances[name] = value;
    setStarResistances(newStarResistances);
  };

  const handleDeltaChange = (e, index) => {
    const { name, value } = e.target;
    const newDeltaResistances = { ...deltaResistances };
    newDeltaResistances[name] = value;
    setDeltaResistances(newDeltaResistances);
  };

  const handleUnitChange = (e, type) => {
    const { value } = e.target;
    const newStarResistances = { ...starResistances };
    const newDeltaResistances = { ...deltaResistances };
    newStarResistances[type] = value;
    newDeltaResistances[type] = value;
    setStarResistances(newStarResistances);
    setDeltaResistances(newDeltaResistances);
  };

  const calculateStarToDelta = () => {
    const { r1, r2, r3, unit1, unit2, unit3 } = starResistances;

    if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      const deltaR1 =
        parseResistance(r1, unit1) +
        parseResistance(r2, unit2) +
        parseResistance(r3, unit3);
      const deltaR2 =
        parseResistance(r1, unit1) +
        parseResistance(r2, unit2) +
        parseResistance(r3, unit3);
      const deltaR3 =
        parseResistance(r1, unit1) +
        parseResistance(r2, unit2) +
        parseResistance(r3, unit3);
      setDeltaResistances({
        r1: deltaR1.toFixed(2),
        r2: deltaR2.toFixed(2),
        r3: deltaR3.toFixed(2),
      });
    }
  };

  const calculateDeltaToStar = () => {
    const { r1, r2, r3, unit1, unit2, unit3 } = deltaResistances;

    if (!isNaN(r1) && !isNaN(r2) && !isNaN(r3)) {
      const starR1 =
        (parseResistance(r1, unit1) * parseResistance(r2, unit2)) /
        (parseResistance(r1, unit1) +
          parseResistance(r2, unit2) +
          parseResistance(r3, unit3));
      const starR2 =
        (parseResistance(r2, unit2) * parseResistance(r3, unit3)) /
        (parseResistance(r1, unit1) +
          parseResistance(r2, unit2) +
          parseResistance(r3, unit3));
      const starR3 =
        (parseResistance(r3, unit3) * parseResistance(r1, unit1)) /
        (parseResistance(r1, unit1) +
          parseResistance(r2, unit2) +
          parseResistance(r3, unit3));
      setStarResistances({
        r1: starR1.toFixed(2),
        r2: starR2.toFixed(2),
        r3: starR3.toFixed(2),
        unit1: "Ω", // Resetting units to default after conversion
        unit2: "Ω",
        unit3: "Ω",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left side: Star Resistances */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Star to Delta Conversion
            </h2>
            <div className="mb-4">
              <label className="block mb-2">Star Resistances:</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="r1"
                  value={starResistances.r1}
                  onChange={(e) => handleStarChange(e, 1)}
                  placeholder="R1"
                  className="p-2 border rounded mb-2 w-full mr-2"
                />
                <select
                  value={starResistances.unit1}
                  onChange={(e) => handleUnitChange(e, "unit1")}
                  className="p-2 px-7 border rounded mb-2"
                >
                  <option value="Ω">Ω</option>
                  <option value="k">kΩ</option>
                  <option value="M">MΩ</option>
                  <option value="m">mΩ</option>
                </select>
              </div>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="r2"
                  value={starResistances.r2}
                  onChange={(e) => handleStarChange(e, 2)}
                  placeholder="R2"
                  className="p-2 border rounded mb-2 w-full mr-2"
                />
                <select
                  value={starResistances.unit2}
                  onChange={(e) => handleUnitChange(e, "unit2")}
                  className="p-2 px-7 border rounded mb-2"
                >
                  <option value="Ω">Ω</option>
                  <option value="k">kΩ</option>
                  <option value="M">MΩ</option>
                  <option value="m">mΩ</option>
                </select>
              </div>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="r3"
                  value={starResistances.r3}
                  onChange={(e) => handleStarChange(e, 3)}
                  placeholder="R3"
                  className="p-2 border rounded mb-2 w-full mr-2"
                />
                <select
                  value={starResistances.unit3}
                  onChange={(e) => handleUnitChange(e, "unit3")}
                  className="p-2 px-7 border rounded mb-2"
                >
                  <option value="Ω">Ω</option>
                  <option value="k">kΩ</option>
                  <option value="M">MΩ</option>
                  <option value="m">mΩ</option>
                </select>
              </div>
              <button
                onClick={calculateStarToDelta}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Convert to Delta
              </button>
            </div>
          </div>

          <div className="flex justify-center m-10 ">
            <div className="w-full">
              <DeltaConnection resistances={deltaResistances} />
            </div>
          </div>

          {/* Right side: Delta to Star Conversion */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Delta to Star Conversion
            </h2>
            <div className="mb-4">
              <label className="block mb-2">Delta Resistances:</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="r1"
                  value={deltaResistances.r1}
                  onChange={(e) => handleDeltaChange(e, 1)}
                  placeholder="R1"
                  className="p-2 border rounded mb-2 w-full mr-2"
                />
                <select
                  value={deltaResistances.unit1}
                  onChange={(e) => handleUnitChange(e, "unit1")}
                  className="p-2 px-7 border rounded mb-2"
                >
                  <option value="Ω">Ω</option>
                  <option value="k">kΩ</option>
                  <option value="M">MΩ</option>
                  <option value="m">mΩ</option>
                </select>
              </div>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="r2"
                  value={deltaResistances.r2}
                  onChange={(e) => handleDeltaChange(e, 2)}
                  placeholder="R2"
                  className="p-2 border rounded mb-2 w-full mr-2"
                />
                <select
                  value={deltaResistances.unit2}
                  onChange={(e) => handleUnitChange(e, "unit2")}
                  className="p-2 px-7 border rounded mb-2"
                >
                  <option value="Ω">Ω</option>
                  <option value="k">kΩ</option>
                  <option value="M">MΩ</option>
                  <option value="m">mΩ</option>
                </select>
              </div>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="r3"
                  value={deltaResistances.r3}
                  onChange={(e) => handleDeltaChange(e, 3)}
                  placeholder="R3"
                  className="p-2 border rounded mb-2 w-full mr-2"
                />
                <select
                  value={deltaResistances.unit3}
                  onChange={(e) => handleUnitChange(e, "unit3")}
                  className="p-2 px-7 border rounded mb-2"
                >
                  <option value="Ω">Ω</option>
                  <option value="k">kΩ</option>
                  <option value="M">MΩ</option>
                  <option value="m">mΩ</option>
                </select>
              </div>
              <button
                onClick={calculateDeltaToStar}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Convert to Star
              </button>
            </div>
          </div>
          <div className="flex justify-center m-10 ">
            <div className="w-full">
              <StarConnection resistances={starResistances} />
            </div>
          </div>
        </div>

        {/* Connection Components */}
        {/* <div className="flex justify-center mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <DeltaConnection resistances={deltaResistances} />
            <StarConnection resistances={starResistances} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ConversionForm;
