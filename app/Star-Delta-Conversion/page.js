// import ResistorColorCodeCalculator from "../components/ResistorColorCodeCalculator";
// "use client";

// import ResistorColorCode from "../../components/ResistorColorCode";
import StarConnection from "../../components/StarConnection";
import DeltaConnection from "../../components/DeltaConnection";
import ConversionForm from "../../components/ConversionForm";
const starDetlaConversion = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-1">
      <div className="container mx-auto">
        <main className="flex flex-col items-center justify-center min-h-screen py-2">


          {/* <div className="py-16 flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold mb-8">
            Star-Detla Conversion            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <StarConnection />
              <DeltaConnection />
            </div>
          </div> */}

          <div className="py-16 flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold mb-8">
              Star to Delta Conversion Tool
            </h1>
            <ConversionForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default starDetlaConversion;
