import { prisma } from "../../src/lib/prisma";
import { describe, it, expect } from "vitest";

describe("Database Smoke Test", () => {
  it("should connect to the database", async () => {
    const result = await prisma.$queryRaw<{ current_database: string }[]>`SELECT current_database()`;
    expect(result[0]?.current_database).toBe("flowforge_test");
  });
});

