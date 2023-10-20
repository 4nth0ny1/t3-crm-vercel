import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const opportunityRouter = createTRPCRouter({
  getAllOpportunities: protectedProcedure
  .input(z.object({contactId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.opportunity.findMany({       
      where: {
        contact: {
          id: input.contactId
        }
      },
    orderBy: [{ createdAt: "desc" }],})
  }),

  createOpportunity: protectedProcedure
  .input(z.object({name: z.string(), description: z.string(), companyId: z.string(), contactId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.db.opportunity.create({
      data: {
        name: input.name,
        description: input.description,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        },
        company: {
          connect: {
            id: input.companyId
          }
        },
        contact: {
          connect: {
            id: input.contactId
          }
        },
      }
    })
  }), 

  deleteOpportunity: protectedProcedure
  .input(z.string())
  .mutation(({ctx, input}) => {
    return ctx.db.opportunity.delete({
      where: {
        id: input
      }
    })
  }), 
});
