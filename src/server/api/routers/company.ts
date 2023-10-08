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


});
