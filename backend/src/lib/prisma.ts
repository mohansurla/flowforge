import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";  
import { PrismaClient } from "../../generated/prisma/client.js";


const connectionString = process.env.DATABASE_URL;

if(!connectionString){
    throw Error("DATABASE_URL is missing. Please configure it in your .env file.");
}

const adapter = new PrismaPg({connectionString});

export const prisma = new PrismaClient({adapter});



