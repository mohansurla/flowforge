import "dotenv/config";
import { prisma } from "../lib/prisma.js";
import { randomBytes } from "crypto";

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not set");
    }
    const databaseName = new URL(databaseUrl).pathname.substring(1);

    if (databaseName !== "flowforge_dev") {
        throw new Error("Seed script can only run against flowforge_dev");
    }

    const email = "dev@flowforge.com";

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name:"Dev User",    
            email,
            passwordHash: `Dev_only_${randomBytes(32).toString("hex")}`,
        },
    });
    console.log(`Development user created`);
    console.log(`user id: ${user.id}`);
    console.log(`email: ${user.email}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})  ;