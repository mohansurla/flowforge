import { createTestUser } from "../fixtures/user.fixture";
import { describe,it,expect,afterEach } from "vitest";
import { prisma } from "../../src/lib/prisma";



describe("Create User test",()=>{
    let userId:string|null = null;
    it("should create a test user", async () => {
        const user = await createTestUser();
        userId = user.id;
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("passwordHash");
    });
    afterEach(async () => {
        if (userId) {
            await prisma.user.delete({ where: { id: userId } });
            userId = null; // Reset the variable after cleanup
        }
    });
    
});




