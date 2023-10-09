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
      orderBy: [{ name: "asc" }],
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

  createCompany: protectedProcedure
  .input(z.object({name: z.string(), state: z.string(), city: z.string(), phone: z.string()}))
  .mutation(async ({ctx, input}) => {
    return await ctx.db.company.create({
      data: {
        name: input.name,
        state: input.state,
        city: input.city,
        phone: input.phone,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      }
    })
  }), 




});
