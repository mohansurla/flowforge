import { describe,beforeEach,afterEach, it,expect } from "vitest";
import { createTestUser } from "../fixtures/user.fixture";
import request from "supertest";
import { prisma } from "../../src/lib/prisma";
import app from "../../src/app"
import crypto from "node:crypto";


describe("Organization API Integration Tests", () => {
    let originalDevUserId:string | undefined;
    let testUserId:string | undefined;
    let organizationId:string|undefined;

    // Setup before each test
    beforeEach(async ()=>{
        originalDevUserId = process.env.DEV_USER_ID;
        const user=await createTestUser();
        process.env.DEV_USER_ID=user.id;
        testUserId=user.id;
    })

    // Test case for creating an organization and assigning the creator as ADMIN
    it("should create an organization and assign the creator as ADMIN", async () => {
        // Your test logic here
        //send http request using supertest
        const payload = {
            name: "Test Organization",
            slug: crypto.randomUUID(),
            description: "This is a test organization"
        };
        const response = await request(app).post("/api/v1/organizations").send(payload);
        expect(response.status).toBe(201);
        // Add more assertions based on your API response
        organizationId = response.body.data.organization.id;
        const org = await prisma.organization.findUnique({where:{id:organizationId}});
        expect(org).not.toBeNull();
        expect(org?.name).toBe(payload.name);
        expect(org?.slug).toBe(payload.slug);
        expect(org?.description).toBe(payload.description);
        const membership = await prisma.membership.findFirst({where:{userId:testUserId,organizationId:organizationId}});
        expect(membership).not.toBeNull();
        expect(membership?.role).toBe("ADMIN");
        expect(membership?.status).toBe("ACTIVE");
    });

    // Test case for invalid request
    it("should return 400 for invalid request", async () => {
        const payload = {
            name: "A", // Invalid name
            slug: "Invalid Slug", // Invalid slug
        };
        await prisma.organization.count().then(count=>{
            expect(count).toBe(0);//organization count before request
        });
        const response = await request(app).post("/api/v1/organizations").send(payload);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Bad Request");
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors.length).toBeGreaterThan(0);
        await prisma.organization.count().then(count=>{
            expect(count).toBe(0);//organization count after request
        });
    });

    //duplicate slug test
    it("should return 409 for duplicate slug", async () => {
        const payload = {
            name: "Test Organization",
            slug: crypto.randomUUID(),
            description: "This is a test organization"
        };
        // Create the first organization
        const firstOrgResponse = await request(app).post("/api/v1/organizations").send(payload);
        expect(firstOrgResponse.status).toBe(201);
        

        // Try to create another organization with the same slug
        const response = await request(app).post("/api/v1/organizations").send(payload);
        organizationId = firstOrgResponse.body.data.organization.id;
        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("A resource with the provided unique value already exists.");
        expect(await prisma.organization.count({where:{slug:payload.slug}})).toBe(1);//only one organization with that slug should exist
    });

    // Cleanup after each test
    afterEach(async ()=>{
        //Delete Organization created by the test user
        try {
            if(organizationId){
            await prisma.$transaction(async (tx) => {
                await tx.membership.deleteMany({
                    where: {
                        userId: testUserId,
                        organizationId: organizationId
                    }
                });
                await tx.organization.deleteMany({ where: { id: organizationId } });// Restore the original DEV_USER_ID
            });
        }
        if(testUserId){
            await prisma.user.delete({ where: { id: testUserId } });
        }
        }finally {
            if(originalDevUserId){
                process.env.DEV_USER_ID = originalDevUserId;
            }else{
                delete process.env.DEV_USER_ID;
            }
            testUserId = undefined;
            organizationId = undefined;
        }
        
    });
});
describe("Organization API Integration Tests - DEV_USER_ID missing", () => {
    //missing DEV_USER_ID test
    it("should return 500 if DEV_USER_ID is missing", async () => {
        const originalDevUserId = process.env.DEV_USER_ID;
        delete process.env.DEV_USER_ID;
        const payload = {
            name: "Test Organization",
            slug: crypto.randomUUID(),
            description: "This is a test organization"
        };
        const response = await request(app).post("/api/v1/organizations").send(payload);
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("UserID not found");
        // Restore the original DEV_USER_ID
        process.env.DEV_USER_ID = originalDevUserId;
    });
});