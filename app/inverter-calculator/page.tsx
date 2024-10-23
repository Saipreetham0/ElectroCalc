"use client";
import React, { useState, useCallback } from "react";
import {
  Calculator,
  Info,
  Battery,
  Phone,
  Mail,
  Download,
  MessageCircle,
  Zap,
  AlertCircle,
  ShoppingCart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Appliance {
  id: string;
  name: string;
  watts: number;
}
interface ApplianceCategory {
  category: string;
  items: Appliance[];
}

interface SelectedApplianceData {
  quantity: number;
  watts: number;
  runtime: number;
}

interface SelectedAppliances {
  [key: string]: SelectedApplianceData;
}

interface Recommendation {
  inverterSize: string;
  batterySize: string;
  batteryCapacity: number;
}

const APPLIANCES: ApplianceCategory[] = [
  {
    category: "Cooling",
    items: [
      { id: "fan-ceiling", name: "Ceiling Fan", watts: 75 },
      { id: "fan-table", name: "Table Fan", watts: 50 },
      { id: "cooler", name: "Room Cooler", watts: 250 },
      { id: "ac-1ton", name: "Air Conditioner (1 Ton, 3 star)", watts: 1200 },
      {
        id: "ac-1.5ton",
        name: "Air Conditioner (1.5 Ton, 3 star)",
        watts: 1700,
      },
      { id: "ac-2ton", name: "Air Conditioner (2 Ton, 3 star)", watts: 2300 },
      {
        id: "ac-1ton-inv",
        name: "Air Conditioner (1 Ton, Inverter)",
        watts: 1100,
      },
      {
        id: "ac-1.5ton-inv",
        name: "Air Conditioner (1.5 Ton, Inverter)",
        watts: 1600,
      },
      {
        id: "ac-2ton-inv",
        name: "Air Conditioner (2 Ton, Inverter)",
        watts: 2100,
      },
    ],
  },
  {
    category: "Lighting",
    items: [
      { id: "led-5w", name: "LED Bulb", watts: 5 },
      { id: "led-9w", name: "LED Bulb", watts: 9 },
      { id: "cfl-15w", name: "CFL Light", watts: 15 },
      { id: "tube-20w", name: "Tubelight", watts: 20 },
      { id: "cfl-30w", name: "CFL Heavy", watts: 30 },
      { id: "tube-40w", name: "Tubelight", watts: 40 },
      { id: "bulb-40w", name: "Light Bulb (Incandescent)", watts: 40 },
      { id: "bulb-60w", name: "Light Bulb (Incandescent)", watts: 60 },
      { id: "bulb-100w", name: "Light Bulb (Incandescent)", watts: 100 },
    ],
  },
  {
    category: "Kitchen",
    items: [
      { id: "mixer", name: "Juicer Mixer Grinder", watts: 800 },
      { id: "toaster", name: "Toaster", watts: 800 },
      { id: "fridge-200l", name: "Refrigerator (upto 200L)", watts: 300 },
      { id: "fridge-500l", name: "Refrigerator (upto 500L)", watts: 500 },
      { id: "microwave", name: "Microwave Oven", watts: 1400 },
    ],
  },
  {
    category: "Entertainment",
    items: [
      { id: "tv-led-40", name: 'Television LED (upto 40")', watts: 60 },
      { id: "tv-crt-21", name: 'Television CRT (upto 21")', watts: 100 },
      { id: "tv-plasma", name: "Television Plasma", watts: 250 },
      { id: "set-top-box", name: "Set Top Box (DTH)", watts: 50 },
      { id: "music-system", name: "Music System", watts: 300 },
      { id: "gaming-console", name: "Gaming Console", watts: 200 },
    ],
  },
  {
    category: "Others",
    items: [
      { id: "laptop", name: "Laptop", watts: 100 },
      { id: "vacuum", name: "Vacuum Cleaner", watts: 1400 },
      { id: "washing-machine", name: "Washing Machine", watts: 1000 },
      { id: "geyser", name: "Geyser/Water Heater", watts: 2200 },
      { id: "room-heater", name: "Room Heater", watts: 2200 },
      { id: "water-pump-0.5hp", name: "Water Pump (0.5 HP)", watts: 400 },
      { id: "water-pump-1hp", name: "Water Pump (1 HP)", watts: 800 },
    ],
  },
];

const DEFAULT_RUNTIME = 4; // Default runtime in hours

const InverterCalculator: React.FC = () => {
  const [selectedAppliances, setSelectedAppliances] =
    useState<SelectedAppliances>({});
  const [runtimeHours, setRuntimeHours] = useState<number>(DEFAULT_RUNTIME);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeCategory, setActiveCategory] = useState<string>("Cooling");

  const validateInput = (
    value: string,
    type: "quantity" | "runtime"
  ): boolean => {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (type === "quantity") {
      return num >= 0 && Number.isInteger(num);
    }
    return num >= 0 && num <= 24;
  };

  const handleQuantityChange = (appliance: Appliance, value: string): void => {
    setSelectedAppliances((prev) => ({
      ...prev,
      [appliance.id]: {
        quantity: parseInt(value) || 0,
        watts: appliance.watts,
        runtime: prev[appliance.id]?.runtime || DEFAULT_RUNTIME,
      },
    }));
  };

  const handleRuntimeChange = (applianceId: string, value: string): void => {
    setSelectedAppliances((prev) => ({
      ...prev,
      [applianceId]: {
        ...prev[applianceId],
        runtime: parseFloat(value) || 0,
      },
    }));
  };
  const calculateTotalLoad = useCallback((): number => {
    return Object.entries(selectedAppliances).reduce(
      (total, [_, appliance]) => {
        const quantity = Math.max(0, appliance.quantity || 0);
        return total + appliance.watts * quantity;
      },
      0
    );
  }, [selectedAppliances]);

  const calculateAverageLoad = useCallback((): number => {
    return Object.entries(selectedAppliances).reduce(
      (total, [_, appliance]) => {
        const quantity = Math.max(0, appliance.quantity || 0);
        const dailyUsageHours = Math.min(
          24,
          Math.max(0, appliance.runtime || 0)
        );
        const usagePercentage = dailyUsageHours / 24;
        return total + appliance.watts * quantity * usagePercentage;
      },
      0
    );
  }, [selectedAppliances]);

  const getRecommendation = useCallback((): Recommendation => {
    const totalLoad = calculateTotalLoad();
    const averageLoad = calculateAverageLoad();

    let inverterSize: string;
    if (totalLoad <= 1000) inverterSize = "1 kVA";
    else if (totalLoad <= 2000) inverterSize = "2 kVA";
    else if (totalLoad <= 3500) inverterSize = "3.5 kVA";
    else inverterSize = "5 kVA";

    let batterySize: string;
    const backupHours = runtimeHours;
    const batteryCapacity = (averageLoad * backupHours) / 12; // 12V system

    if (batteryCapacity <= 150) batterySize = "150Ah";
    else if (batteryCapacity <= 200) batterySize = "200Ah";
    else batterySize = "Multiple batteries required";

    return { inverterSize, batterySize, batteryCapacity };
  }, [calculateTotalLoad, calculateAverageLoad, runtimeHours]);

  const handleCalculate = useCallback(() => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (calculateTotalLoad() > 0) {
      setHasCalculated(true);
    }
  }, [calculateTotalLoad, errors]);

  const getBuyLinks = useCallback((recommendation: Recommendation) => {
    // You can customize these affiliate links based on the recommended sizes
    const getInverterLink = (size: string) => {
      const links = {
        "1 kVA": "https://amzn.to/3NAJpRs",
        "2 kVA": "https://amzn.to/3YxP0hV",
        "3.5 kVA": "https://amzn.to/4dWJnyb",
        "5 kVA": "https://amzn.to/4ffgJtf",
      };
      return links[size as keyof typeof links] || links["1 kVA"];
    };

    const getBatteryLink = (size: string) => {
      const links = {
        "150Ah": "https://amzn.to/3YljGS4",
        "200Ah": "https://amzn.to/3A6JQQB",
      };
      return links[size as keyof typeof links] || links["150Ah"];
    };

    return {
      inverterLink: getInverterLink(recommendation.inverterSize),
      batteryLink: getBatteryLink(recommendation.batterySize),
    };
  }, []);

  const calculateLoadPercentages = useCallback((): {
    [key: string]: number;
  } => {
    const averageLoad = calculateAverageLoad();
    return {
      "100": averageLoad,
      "75": averageLoad * 0.75,
      "50": averageLoad * 0.5,
      "25": averageLoad * 0.25,
    };
  }, [calculateAverageLoad]);

  const downloadLoadReport = useCallback(() => {
    const loads = calculateLoadPercentages();
    const totalLoad = calculateTotalLoad();
    const recommendation = getRecommendation();

    let report = `Inverter Load Analysis Report\n`;
    report += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    report += `Total Connected Load: ${totalLoad.toLocaleString()}W\n`;
    report += `Average Running Load: ${Math.round(
      loads["100"]
    ).toLocaleString()}W\n\n`;
    report += `Load Analysis:\n`;
    report += `100% Load: ${Math.round(loads["100"]).toLocaleString()}W\n`;
    report += `75% Load: ${Math.round(loads["75"]).toLocaleString()}W\n`;
    report += `50% Load: ${Math.round(loads["50"]).toLocaleString()}W\n`;
    report += `25% Load: ${Math.round(loads["25"]).toLocaleString()}W\n\n`;
    report += `Recommended Setup:\n`;
    report += `Inverter Size: ${recommendation.inverterSize}\n`;
    report += `Battery Size: ${recommendation.batterySize}\n`;
    report += `Backup Duration: ${runtimeHours} hours\n\n`;
    report += `Selected Appliances:\n`;

    Object.entries(selectedAppliances).forEach(([id, data]) => {
      const appliance = APPLIANCES.flatMap((cat) => cat.items).find(
        (item) => item.id === id
      );
      if (appliance && data.quantity > 0) {
        report += `${appliance.name}: ${data.quantity} units, ${data.runtime} hours/day\n`;
      }
    });
    // Adding contact information
    report += `\nContact Us:\n`;
    report += `Phone: 9550421866\n`;
    report += `Email: sales@kspelectronics.in\n`;
    report += `Website: kspelectronics.in\n`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inverter-load-report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, [
    calculateLoadPercentages,
    calculateTotalLoad,
    getRecommendation,
    selectedAppliances,
    runtimeHours,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-2 shadow-xl bg-white/90">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
              <CardTitle className="text-xl md:text-3xl text-center text-indigo-900">
                Inverter Calculator
              </CardTitle>
            </div>
            <CardDescription className="text-sm md:text-lg text-center">
              Calculate your power needs instantly
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Mobile Category Selector */}
        <div className="lg:hidden">
          <select
            className="w-full p-2 rounded-lg border-2 bg-white"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {APPLIANCES.map((cat) => (
              <option key={cat.category} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appliances Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mobile View */}
            <div className="lg:hidden">
              {APPLIANCES.map(
                (category) =>
                  category.category === activeCategory && (
                    <Card
                      key={category.category}
                      className="border-2 shadow-xl bg-white/90"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg text-indigo-900">
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.items.map((appliance) => (
                            <div
                              key={appliance.id}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="font-medium mb-2">
                                {appliance.name}
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-sm text-gray-600">
                                    Quantity
                                  </label>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={
                                      selectedAppliances[appliance.id]
                                        ?.quantity || ""
                                    }
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        appliance,
                                        e.target.value
                                      )
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm text-gray-600">
                                    Hours/day
                                  </label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    value={
                                      selectedAppliances[appliance.id]
                                        ?.runtime || ""
                                    }
                                    onChange={(e) =>
                                      handleRuntimeChange(
                                        appliance.id,
                                        e.target.value
                                      )
                                    }
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block">
              {APPLIANCES.map((category) => (
                <Card
                  key={category.category}
                  className="border-2 shadow-xl bg-white/90"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-900">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Appliance</TableHead>
                          <TableHead>Power (W)</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Runtime (hrs)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.items.map((appliance) => (
                          <TableRow key={appliance.id}>
                            <TableCell>{appliance.name}</TableCell>
                            <TableCell>{appliance.watts}W</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                className="w-20"
                                value={
                                  selectedAppliances[appliance.id]?.quantity ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleQuantityChange(
                                    appliance,
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                max="24"
                                step="0.5"
                                className="w-20"
                                value={
                                  selectedAppliances[appliance.id]?.runtime ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleRuntimeChange(
                                    appliance.id,
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="sticky top-6 space-y-4">
              <Card className="border-2 shadow-xl bg-white/90">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5 text-indigo-600" />
                    Power Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Backup Time Input */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700">
                      Backup Time Needed
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        min="1"
                        max="24"
                        value={runtimeHours}
                        onChange={(e) =>
                          setRuntimeHours(
                            parseFloat(e.target.value) || DEFAULT_RUNTIME
                          )
                        }
                        className="w-24"
                      />
                      <span className="text-sm text-gray-600">hours</span>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={handleCalculate}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Requirements
                  </Button>
                  {/* Results (shown only after calculation) */}
                  {hasCalculated && calculateTotalLoad() > 0 && (
                    <>
                      {/* Load Summary */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <div className="text-xs font-medium text-indigo-700">
                            Total Load
                          </div>
                          <div className="text-xl font-bold text-indigo-900">
                            {calculateTotalLoad().toLocaleString()}W
                          </div>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <div className="text-xs font-medium text-indigo-700">
                            Avg. Load
                          </div>
                          <div className="text-xl font-bold text-indigo-900">
                            {Math.round(
                              calculateAverageLoad()
                            ).toLocaleString()}
                            W
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-blue-700" />
                            <span className="font-medium text-blue-800">
                              Load Analysis
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-700 border-blue-300 hover:bg-blue-100"
                            onClick={downloadLoadReport}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(calculateLoadPercentages()).map(
                            ([percentage, load]) => (
                              <div
                                key={percentage}
                                className="p-2 bg-white rounded border border-blue-200"
                              >
                                <div className="text-xs text-blue-700">
                                  {percentage}% Load
                                </div>
                                <div className="text-lg font-bold text-blue-900">
                                  {Math.round(load).toLocaleString()}W
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="text-xs text-blue-600 mt-2">
                          *Load percentages help estimate varying usage
                          scenarios
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="p-4 bg-green-50 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                          <Battery className="h-5 w-5 text-green-700" />
                          <span className="font-medium text-green-800">
                            Recommended Setup
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-green-700">
                              Inverter
                            </div>
                            <div className="text-lg font-bold text-green-900">
                              {getRecommendation().inverterSize}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-green-700">
                              Battery
                            </div>
                            <div className="text-lg font-bold text-green-900">
                              {getRecommendation().batterySize}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 pt-2">
                        <Button
                          className="w-full bg-amber-500 hover:bg-amber-600 h-auto py-2"
                          onClick={() =>
                            window.open(
                              getBuyLinks(getRecommendation()).inverterLink,
                              "_blank"
                            )
                          }
                        >
                          <div className="flex flex-col items-center">
                            <span className="flex items-center">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Buy Recommended Inverter
                            </span>
                            <span className="text-xs opacity-90">
                              Best Price on Amazon
                            </span>
                          </div>
                        </Button>
                        <Button
                          className="w-full bg-amber-500 hover:bg-amber-600 h-auto py-2"
                          onClick={() =>
                            window.open(
                              getBuyLinks(getRecommendation()).batteryLink,
                              "_blank"
                            )
                          }
                        >
                          <div className="flex flex-col items-center">
                            <span className="flex items-center">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Buy Recommended Battery
                            </span>
                            <span className="text-xs opacity-90">
                              Best Price on Amazon
                            </span>
                          </div>
                        </Button>

                        {/* Contact Us Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-green-600 hover:bg-green-700 h-auto py-2">
                              <div className="flex flex-col items-center">
                                <span className="flex items-center">
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Get Expert Assistance
                                </span>
                                <span className="text-xs opacity-90">
                                  Personalized Setup Recommendation
                                </span>
                              </div>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md bg-white">
                            <DialogHeader>
                              <DialogTitle>Contact Our Experts</DialogTitle>
                              <DialogDescription>
                                Get personalized recommendations for your
                                inverter and battery setup
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center space-x-4">
                                <Phone className="h-5 w-5 text-green-600" />
                                <div>
                                  <p className="font-medium">Call Us</p>
                                  <p className="text-sm text-gray-500">
                                    +91 9550421866
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Mail className="h-5 w-5 text-green-600" />
                                <div>
                                  <p className="font-medium">Email Us</p>
                                  <p className="text-sm text-gray-500">
                                    sales@kspelectronics.in
                                  </p>
                                </div>
                              </div>
                              <div className="border-t pt-4">
                                <p className="text-sm text-gray-600">
                                  Our experts will help you choose the perfect
                                  setup based on your specific requirements and
                                  local conditions.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="h-5 w-5 text-indigo-600" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="howto" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline hover:bg-gray-50 rounded-lg px-2">
                        <span className="text-sm">How to Calculate</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                          <li>Enter appliance quantities</li>
                          <li>Set daily runtime hours</li>
                          <li>Adjust backup time if needed</li>
                          <li>View recommendations above</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tips" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline hover:bg-gray-50 rounded-lg px-2">
                        <span className="text-sm">Important Notes</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          <li>Consider peak usage times</li>
                          <li>Account for startup power</li>
                          <li>Plan for future needs</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                    <p className="text-xs text-amber-700">
                      *Prices and availability are subject to change. We earn
                      from qualifying purchases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterCalculator;
