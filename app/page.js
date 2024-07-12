import Card from "../components/card";
import Head from "next/head";

export const metadata = {
  title: "ElectroCalc",
  description: "electronics deals",
};
const ciruitofthings = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* <Head>
        <title>Tool Dashboard</title>
        <meta
          name="description"
          content="Tool Dashboard with various functionalities"
        />
      </Head> */}

      <main className="py-16 flex flex-col items-center w-full ">
        <h1 className="text-4xl font-bold mb-8">ElectroCalc</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl px-4">
          <Card
            title="Resistor Color Code"
            category="Electronics"
            description=""
            url="/resistor-calculator"
          />
          <Card
            title="Star-Delta Conversion"
            category="Electronics"
            description=""
            url="/Star-Delta-Conversion"
          />
          <Card
            title="Ohm Law Calculator"
            category="Electronics"
            description=""
            url="/ohm-law-calculator"
          />
          <Card
            title="SMD Resistor Code "
            category="Electronics"
            description=""
            url="/SMD-resistor-code"
          />
          <Card
            title="SMD Resistor Code "
            category="Electronics"
            description=""
            url="/SMD-resistor-code"
          />
          <Card
            title="SMD Resistor Code "
            category="Electronics"
            description=""
            url="/SMD-resistor-code"
          />
          <Card
            title="SMD Resistor Code "
            category="Electronics"
            description=""
            url="/SMD-resistor-code"
          />
        </div>
      </main>
    </div>
  );
};

export default ciruitofthings;
