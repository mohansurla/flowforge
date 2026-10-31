import {prisma} from "../lib/prisma.js"

const result = await prisma.$queryRaw`SELECT current_database()`

console.log(result);