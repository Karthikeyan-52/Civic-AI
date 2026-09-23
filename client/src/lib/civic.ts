export type CivicLocation = { label: string; lat: number; lng: number };
export type CivicSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type CivicDraft = {
  problem: string;
  category: string;
  severity: CivicSeverity;
  priority: number;
  department: string;
  description: string;
  location: CivicLocation;
  aiReason: string;
  recommendedAction: string;
  user: string;
  voiceText?: string;
};

export function classify(description: string, voiceText = "", location: CivicLocation = { label: "Your selected location", lat: 12.9716, lng: 77.5946 }): CivicDraft {
  const text = `${description} ${voiceText}`.toLowerCase();
  let category = "Other";
  let problem = "Civic issue";
  let department = "General Civic Services";
  if (text.includes("pothole") || text.includes("road") || text.includes("crack")) { category = "Road Damage"; problem = "Pothole / road damage"; department = "Road Maintenance"; }
  else if (text.includes("garbage") || text.includes("waste") || text.includes("trash") || text.includes("bin")) { category = "Garbage/Waste"; problem = "Overflowing garbage"; department = "Waste Management"; }
  else if (text.includes("streetlight") || text.includes("street light") || text.includes("lamp") || text.includes("dark")) { category = "Streetlight"; problem = "Broken streetlight"; department = "Electrical / Streetlight"; }
  else if (text.includes("water") || text.includes("leak") || text.includes("pipe")) { category = "Water Leakage"; problem = "Water leakage"; department = "Water Supply"; }
  else if (text.includes("drain") || text.includes("flood") || text.includes("water pool")) { category = "Drainage"; problem = "Blocked drainage"; department = "Drainage"; }
  else if (text.includes("sign") || text.includes("traffic")) { category = "Traffic Sign/Damage"; problem = "Damaged traffic sign"; department = "Traffic Management"; }
  const urgency = text.includes("danger") || text.includes("accident") || text.includes("heavy") || text.includes("large") || text.includes("flood") ? 18 : 0;
  const base: Record<string, number> = { "Road Damage": 69, "Garbage/Waste": 47, Streetlight: 61, "Water Leakage": 74, Drainage: 54, "Traffic Sign/Damage": 66, Other: 36 };
  const priority = Math.min(98, (base[category] ?? 36) + urgency + (description.length > 90 ? 5 : 0));
  const severity: CivicSeverity = priority >= 76 ? "CRITICAL" : priority >= 56 ? "HIGH" : priority >= 31 ? "MEDIUM" : "LOW";
  const reasons: Record<string, string> = {
    "Road Damage": "Road damage on a public route can create a safety risk for vehicles and pedestrians.",
    "Garbage/Waste": "Accumulated waste can create hygiene concerns and attract pests if collection is delayed.",
    Streetlight: "Low visibility increases night-time safety risk for pedestrians and commuters.",
    "Water Leakage": "A water leak wastes treated water and may damage the road surface or nearby properties.",
    Drainage: "Blocked drainage can cause standing water, flooding, and sanitation issues during rainfall.",
    "Traffic Sign/Damage": "Missing or damaged traffic guidance can increase confusion and collision risk.",
    Other: "The issue should be reviewed by civic services and routed to the most relevant team.",
  };
  return { problem, category, severity, priority, department, description, location, aiReason: reasons[category], recommendedAction: `Inspect the reported ${category.toLowerCase()} issue and coordinate a resolution with ${department}.`, user: "Aarav Mehta" };
}
