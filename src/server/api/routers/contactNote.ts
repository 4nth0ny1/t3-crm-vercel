import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const contactNoteRouter = createTRPCRouter({
  getAllContactNotes: protectedProcedure
  .input(z.object({contactId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.contactNote.findMany({       
      where: {
        contact: {
          id: input.contactId
        }
      },
    orderBy: [{ createdAt: "desc" }],})
  }),

  createContactNote: protectedProcedure
  .input(z.object({content: z.string(), companyId: z.string(), contactId: z.string()}))
  .mutation(({ctx, input}) => {
    return ctx.db.contactNote.create({
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
        }, 
        contact: {
          connect: {
            id: input.contactId
          }
        }
      }
    })
  }), 

//   deleteNote: protectedProcedure
//   .input(z.string())
//   .mutation(({ctx, input}) => {
//     return ctx.db.companyNote.delete({
//       where: {
//         id: input
//       }
//     })
//   }), 
});
