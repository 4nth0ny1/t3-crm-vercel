import { exampleRouter } from "~/server/api/routers/example";
import { companyRouter } from "~/server/api/routers/company";
import { companyNoteRouter } from "../api/routers/companyNote"
import { contactRouter } from "./routers/contact";

import { createTRPCRouter } from "~/server/api/trpc";
import { attemptRouter } from "./routers/attempt";
import { contactNoteRouter } from "./routers/contactNote";
import { opportunityRouter } from "./routers/opportunity";

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
  attempt: attemptRouter,
  contactNote: contactNoteRouter, 
  opportunity: opportunityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
