import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const companyNoteRouter = createTRPCRouter({
  getAllNotes: protectedProcedure
  .input(z.object({companyId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.companyNote.findMany({       
      where: {
        company: {
          id: input.companyId
        }
      },
    orderBy: [{ createdAt: "desc" }],})
  }),

  createNote: protectedProcedure
  .input(z.object({content: z.string(), companyId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.db.companyNote.create({
      data: {
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
        }
      }
    })
  }), 
});
