import { describe, expect, it } from "vitest";
import { classify } from "../client/src/lib/civic";

describe("CivicAI fallback classifier", () => {
  it("routes a pothole report to road maintenance with elevated priority", () => {
    const result = classify("There is a large pothole near the college entrance.");

    expect(result.category).toBe("Road Damage");
    expect(result.department).toBe("Road Maintenance");
    expect(result.problem).toContain("Pothole");
    expect(result.priority).toBeGreaterThanOrEqual(76);
    expect(result.severity).toBe("CRITICAL");
  });

  it("uses voice text when the typed description is empty", () => {
    const result = classify("", "The streetlight is broken near the bus stand");

    expect(result.category).toBe("Streetlight");
    expect(result.department).toBe("Electrical / Streetlight");
    expect(result.priority).toBeGreaterThan(50);
  });

  it("falls back to general civic services for unknown issues", () => {
    const result = classify("A public bench needs attention");

    expect(result.category).toBe("Other");
    expect(result.department).toBe("General Civic Services");
    expect(result.severity).toBe("MEDIUM");
  });
});
