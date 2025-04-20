import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function App() {
  const [image, setImage] = useState(null);
  const [symptom, setSymptom] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleDiagnose = () => {
    // Dummy AI output
    setDiagnosis({
      issue: "Alternator Failure",
      steps: [
        "Disconnect battery",
        "Remove serpentine belt",
        "Unscrew alternator bolts",
        "Replace with new alternator",
      ],
      parts: [
        {
          name: "Bosch Alternator A900",
          price: "₹7,000",
          vendors: ["Amazon", "Flipkart"],
        },
      ],
      mechanic: {
        name: "John Auto Garage",
        rating: "5.0 ⭐",
        eta: "2 hrs",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">RepairIQ - Diagnose Vehicle Problems with AI</h1>
      <Card className="w-full max-w-xl">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <Input type="file" onChange={handleImageUpload} accept="image/*" />
            <Input
              placeholder="Describe the symptom (e.g. ticking noise in engine)"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
            />
            <Button onClick={handleDiagnose}>
              <Upload className="mr-2" /> Diagnose
            </Button>
          </div>
        </CardContent>
      </Card>

      {diagnosis && (
        <Card className="w-full max-w-xl mt-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Diagnosis Result</h2>
            <p><strong>Issue:</strong> {diagnosis.issue}</p>
            <p className="mt-2 font-medium">Repair Steps:</p>
            <ul className="list-disc ml-6">
              {diagnosis.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>

            <p className="mt-4 font-medium">Required Parts:</p>
            {diagnosis.parts.map((part, idx) => (
              <div key={idx} className="mb-2">
                <p>{part.name} - <strong>{part.price}</strong></p>
                <p>Available on: {part.vendors.join(", ")}</p>
              </div>
            ))}

            <p className="mt-4 font-medium">Nearby Mechanic:</p>
            <p>{diagnosis.mechanic.name} ({diagnosis.mechanic.rating})</p>
            <p>ETA: {diagnosis.mechanic.eta}</p>

            <Button className="mt-4">Notify Mechanic</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}