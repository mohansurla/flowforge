import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js"

describe("Get /health", () =>{
    it("should return 200 OK", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok" });
    });
});

describe("should return 404 Not Found", () => {
    it("should return 404 Not Found", async () => {
        const response = await request(app).get("/unknown");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Not Found" });
    })
});