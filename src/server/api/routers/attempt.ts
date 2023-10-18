import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const attemptRouter = createTRPCRouter({
  getAllAttempts: protectedProcedure
  .input(z.object({contactId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.attempt.findMany({       
      where: {
        contact: {
          id: input.contactId
        }
      },
    orderBy: [{ createdAt: "desc" }],})
  }),

  createAttempt: protectedProcedure
  .input(z.object({type: z.string(), content: z.string(), companyId: z.string(), contactId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.db.attempt.create({
      data: {
        type: input.type,
        content: input.content,
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

  deleteAttempt: protectedProcedure
  .input(z.string())
  .mutation(({ctx, input}) => {
    return ctx.db.attempt.delete({
      where: {
        id: input
      }
    })
  }), 
});
