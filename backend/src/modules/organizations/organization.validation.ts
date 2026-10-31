import {z} from "zod";

export const organizationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2,"name must contain at least 2 characters")
        .max(100,"name cannot exceed 100 characters"),
    slug: z
        .string()
        .trim()
        .min(1,"slug must contain at least 1 character")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,"Slug can contain only lowercase letters, numbers, and hyphens"),     
    description: z.
        string()
        .trim()
        .max(500,"description cannot exceed 500 characters")
        .transform((v)=> v=== "" ? undefined : v)
        .optional(),
});

export type CreateOrganizationInput = z.infer<typeof organizationSchema>;