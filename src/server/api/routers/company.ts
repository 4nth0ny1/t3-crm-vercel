import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const companyRouter = createTRPCRouter({

  getAllCompanies: protectedProcedure.query(({ ctx }) => {
    return ctx.db.company.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getOneCompany: protectedProcedure
  .input(z.object({companyId: z.string()}))
  .query(async ({ctx, input}) => {
    return await ctx.db.company.findUnique({
      where: {
        id: input.companyId
      }, 
      
    })
  }), 




});
