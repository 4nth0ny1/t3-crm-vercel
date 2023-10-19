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

//   createNote: protectedProcedure
//   .input(z.object({content: z.string(), companyId: z.string()}))
//   .mutation(({ctx, input}) => {
//     return ctx.db.companyNote.create({
//       data: {
//         content: input.content,
//         user: {
//           connect: {
//             id: ctx.session.user.id
//           }
//         },
//         company: {
//           connect: {
//             id: input.companyId
//           }
//         }
//       }
//     })
//   }), 

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
