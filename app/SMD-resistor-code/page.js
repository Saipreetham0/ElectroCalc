import SMDResistorCalculator from "../../components/smd-calculator";
const smdResistorCode = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-1">
      <div className="container mx-auto">
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
          {/* <h1 className="text-4xl font-bold mb-8">Resistor Color Code</h1> */}
          <SMDResistorCalculator />
        </main>
      </div>
    </div>
  );
};

export default smdResistorCode;
