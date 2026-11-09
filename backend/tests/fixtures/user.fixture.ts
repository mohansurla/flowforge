import {prisma} from "../../src/lib/prisma"
import crypto from "node:crypto"




export async function createTestUser(){
    const uniqueId=crypto.randomUUID();
    const user = await prisma.user.create({data:{
        name:"Integration Test User",
        email:`${uniqueId}@flowforge.test`,
        passwordHash:"NOT_A_REAL_PASSWORD_HASH",
    }});
    return user;
}


