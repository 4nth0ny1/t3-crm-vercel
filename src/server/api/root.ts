import { exampleRouter } from "~/server/api/routers/example";
import { companyRouter } from "~/server/api/routers/company";
import { companyNoteRouter } from "../api/routers/companyNote"
import { contactRouter } from "./routers/contact";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  company: companyRouter,
  companyNote: companyNoteRouter,
  contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
