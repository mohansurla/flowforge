import { describe, it, expect } from "vitest";
import { organizationSchema } from "../../src/modules/organizations/organization.validation";

describe("Organization Schema Validation", () => {

  it("should trim whitespace from organization name", () => {
    const result = organizationSchema.safeParse({
      name: "  Engineering Team  ",
      slug: "engineering-team",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe("Engineering Team");
    }
  });

  it("should accept a valid slug", () => {
    const result = organizationSchema.safeParse({
      name: "Engineering Team",
      slug: "engineering-team",
    });

    expect(result.success).toBe(true);
  });

  it("should reject consecutive hyphens in slug", () => {
    const result = organizationSchema.safeParse({
      name: "Engineering Team",
      slug: "engineering--team",
    });

    expect(result.success).toBe(false);
  });

  it("should convert whitespace-only description to undefined", () => {
    const result = organizationSchema.safeParse({
      name: "Engineering Team",
      slug: "engineering-team",
      description: "   ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.description).toBeUndefined();
    }
  });

  it("should allow missing description", () => {
    const result = organizationSchema.safeParse({
      name: "Engineering Team",
      slug: "engineering-team",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.description).toBeUndefined();
    }
  });

});