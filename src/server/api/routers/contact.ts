import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const contactRouter = createTRPCRouter({
  getAllContacts: protectedProcedure
  .input(z.object({companyId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.contact.findMany({       
      where: {
        company: {
          id: input.companyId
        }
      },
    orderBy: [{ createdAt: "desc" }],})
  }),

  getOneContact: protectedProcedure
  .input(z.object({contactId: z.string()}))
  .query(async ({ctx, input}) => {
    return await ctx.db.contact.findUnique({
      where: {
        id: input.contactId
      }, 
      
    })
  }), 

  createContact: protectedProcedure
  .input(z.object({name: z.string(), title: z.string(), phone: z.string(), email: z.string(), companyId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.db.contact.create({
      data: {
        name: input.name,
        title: input.title,
        phone: input.phone,
        email: input.email,
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

  deleteContact: protectedProcedure
  .input(z.string())
  .mutation(({ctx, input}) => {
    return ctx.db.contact.delete({
      where: {
        id: input
      }
    })
  }), 
});
