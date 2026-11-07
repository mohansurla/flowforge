import dotenv from "dotenv";
import { beforeAll, afterAll } from "vitest";

dotenv.config({
    path: ".env.test",
    override: true,
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from .env.test");
}


const databaseName = new URL(
    databaseUrl!
  ).pathname.slice(1);

if (databaseName !== "flowforge_test") {
    throw new Error("Integration tests must use flowforge_test");
}
const {prisma} = await import("../src/lib/prisma.js")

beforeAll(async ()=>{
    await prisma.$connect();
})

afterAll(async ()=>{
    await prisma.$disconnect();
})