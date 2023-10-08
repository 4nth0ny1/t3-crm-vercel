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
});
