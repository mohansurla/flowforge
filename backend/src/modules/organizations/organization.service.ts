import { MembershipRole,MembershipStatus } from "../../../generated/prisma/enums.js";
import {prisma} from "../../lib/prisma.js"
import { type CreateOrganizationInput } from "./organization.validation.js" 

export async function createOrganization(
    userId:string,
    input:CreateOrganizationInput
) {
    return prisma.$transaction(async (tx) => {
        
        //Create organization
        const organization=await tx.organization.create({
            data:{
                name:input.name,
                slug:input.slug,
                ...(input.description!==undefined && {description:input.description}),
            },
        });

        //Create Owner Membership
        const membership=await tx.membership.create({
            data:{
                userId,
                organizationId:organization.id,
                role:MembershipRole.ADMIN,
                status:MembershipStatus.ACTIVE,
                joinedAt:new Date(),
            }
        })

        return {organization,membership}

    });
}